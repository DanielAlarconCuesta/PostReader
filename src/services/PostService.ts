import PostRequest from "../interfaces/PostRequest";
import PostResponse from "../interfaces/PostResponse";

import User from "../interfaces/User";
import UserResponse from "../interfaces/UserResponse";

import Post from "../interfaces/Post";
 
const SUPERMETRICS_SERVICE_HOST: (string | undefined) = process.env.REACT_APP_SUPERMETRICS_SERVICE_HOST;
const ENDPOINT: string = SUPERMETRICS_SERVICE_HOST ? `${SUPERMETRICS_SERVICE_HOST}posts` : "";

const handleResponse = (response: Response): Promise<PostResponse> => {

    let postResponse: PostResponse = {};

    return response.json()
        .then((data: PostResponse) => {
            postResponse = data;
            return postResponse;

        }).catch((error: any) => {
            postResponse.error = handleError(error);
            return postResponse;
        })
}

export const handleError = (error?: any) => {

    let errorProcessed: Error;

    if (error && typeof(error) == "string") {
        errorProcessed = new Error(error);

    } else if (error && error instanceof Error) {
        errorProcessed = error;

    } else {
        errorProcessed = new Error("Unknown error");
    }

    return errorProcessed;
}

export function _checkDataErrors(postRequest: PostRequest): Error | null {

    let error = null;

    if (!ENDPOINT) {
        error = new Error("Server endpoint is missing");
    
    } else if (!postRequest) {
        error = new Error("Required data for register is missing");

    } else {

        if (!postRequest.sl_token) {
            error = new Error("sl_token is missing");
        }
    }

    return error;
}

export function _prepareParams(postRequest: PostRequest): string {

    let url = new URL(ENDPOINT),
        endpoint = url.toString(),
        params = new URLSearchParams(url.search);

    if (postRequest?.sl_token) {
        params.append("sl_token", postRequest.sl_token);
    }

    if (postRequest?.page) {
        params.append("page", postRequest.page.toString());
    }

    if (params?.toString()) {
        endpoint += `?${params.toString()}`;
    }

    return endpoint;
}

export async function doRequest(postRequest: PostRequest): Promise<PostResponse> {

    let postResponse: PostResponse = {};

    let error = _checkDataErrors(postRequest);

    if (error) {
        postResponse.error = error
        return postResponse;
    }

    if (!postRequest.page) {
        postRequest.page = 1;
    }

    let endpoint = _prepareParams(postRequest);

    try {

        await fetch(endpoint)
            .then(async (response: Response) => {
                postResponse = await handleResponse(response);

            }).catch((error: any) => {
                postResponse.error = handleError(error);
            })


    } catch(error: any) {
        postResponse.error = handleError(error);
    }

    return postResponse;
}

export function sortUsersAlphabetically(users: User[]): User[] {

   if (!users || !Array.isArray(users)) {
      return [];
   }

   let text1 = "";
   let text2 = "";

   let sortedUsers: User[] = users.sort((first: User, second: User) => {

      text1 = first?.name ? first.name.toLowerCase() : "";
      text2 = second?.name ? second.name.toLowerCase() : "";

      return text1.localeCompare(text2);
   })

   return sortedUsers;
}



export async function getPosts(postRequest: PostRequest): Promise<PostResponse> {

    let postResponse: PostResponse = await doRequest(postRequest);
    return postResponse;
}

export async function getUsers(postRequest: PostRequest, users?: User[] | null): Promise<UserResponse> {
 
    let userResponse: UserResponse = {},
        postResponse: PostResponse = await getPosts(postRequest);

    if (postResponse.error) {
        userResponse.error = postResponse.error;
        return userResponse;
    }

    if (!postResponse?.data?.posts) {
        return userResponse;
    }

    if (!users) {
        users = []
    }

    let usersUpdated: User[] = postResponse.data.posts.reduce((users: User[], post: Post) => {
  
        const index = users.findIndex(user => {
            return user.id === post.from_id;
        });
      
        if (index > -1) {

            if (!users[index].posts || !Array.isArray(users[index].posts)) {
                users[index].posts = [];
            }

            //users[index].posts = [...users[index].posts!, post];
            users[index].posts!.push(post);

        } else {
          users.push(
            {
              name: post.from_name,
              id: post.from_id,
              posts: [post]
            })
        }
            
        return users;
        
    }, users);

    userResponse.users = sortUsersAlphabetically(usersUpdated);

    return userResponse;
}

const PostService = {
    getPosts,
    getUsers
}

export default PostService;
