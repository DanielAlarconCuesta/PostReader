import Post from "./Post";

interface Meta {
    request_id: string
}

interface Data {
    page: number,
    posts: Post[]
}

interface PostResponse {
    meta: Meta,
    data: Data
}

export default PostResponse;
