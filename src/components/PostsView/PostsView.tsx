import React, { useState, useEffect } from "react";

import Client from "../../interfaces/Client";

import PostService from '../../services/PostService';
import PostRequest from '../../interfaces/PostRequest';

import UserResponse from '../../interfaces/UserResponse';
import User from '../../interfaces/User';

import { UserActionType } from '../../actions/userActions';
import { useDispatch, useSelector  } from 'react-redux';
import { RootState } from '../../store';

import UserBoxList from '../UserBoxList/UserBoxList';

import Post from "../../interfaces/Post";
import PostBoxList from "../PostBoxList/PostBoxList";
import PostsToolBar from "../PostsToolBar/PostsToolBar"

import { SessionActionType } from "../../actions/sessionActions";

import "./PostsView.css";

function PostView() {

    const dispatch = useDispatch();

	const users: User[] = useSelector<RootState, User[]>((state) => state.users.users);
	const selectedUser: User | null = useSelector<RootState, User | null>((state) => state.userBoxList.selectedUser);
	const sortedByNewest: boolean = useSelector<RootState, boolean>((state) => state.toolBar.sortByNewest);
	const client: Client | null = useSelector<RootState, Client | null>((state) => state.session.client);

	const [posts, setPosts] = useState<Post[]>([]);
	const [nextPage, setNextPage] = useState<number>(1);
	
	const sortByOldest = (posts: Post[]) => {
		let sortedPosts: Post[] = posts.sort((first: Post, second: Post) => {

			try {
				let firstDate = new Date(first.created_time);
				let secondDate = new Date(second.created_time);

				if (!firstDate || !secondDate) {
					return 1;
				}

				if (firstDate > secondDate) return 1;
				else return -1;

			} catch(error) {
				return 1;
			}
		})

		return sortedPosts;
	}

	const sortByNewest = (posts: Post[]) => {
		let sortedPosts: Post[] = posts.sort((first: Post, second: Post) => {

			try {
				let firstDate = new Date(first.created_time);
				let secondDate = new Date(second.created_time);

				if (!firstDate || !secondDate) {
					return -1;
				}

				if (firstDate > secondDate) return -1;
				else return 1;

			} catch(error) {
				return -1;
			}
		})

		return sortedPosts;
	}

	useEffect(() => {

		if (selectedUser && selectedUser.posts) {

			let posts: Post[] = selectedUser.posts.slice(0);

			if (sortedByNewest) setPosts(sortByNewest(posts));
			else setPosts(sortByOldest(posts));

		} else {
			setPosts([]);
		}

	}, [selectedUser, sortedByNewest, users])
  
	useEffect(() => {

		loadPosts();

	}, []);

	useEffect(() => {

		console.log("users changed", users);

	}, [users]);

	const handlerLoadMoreClick = function() {
		loadPosts();
	}

	const loadPosts = function() {
		let postRequest: PostRequest = {
			sl_token: (client?.sl_token || ""),
			page: nextPage
		}

		let previousLengthUsers: number = users?.length | 0;

		PostService.getUsers(postRequest, users)
			.then((userResponse: UserResponse) => {

				if (userResponse.error) {
					dispatch({
						type: UserActionType.GET_USERS_FAIL,
						payload: userResponse.error
					});

					if (userResponse.error.message == "Invalid SL Token") {
						alert("Client is expired. Loging out...");

						dispatch({
							type: SessionActionType.REMOVE_SESSION
						});
					}
				
				} else if (userResponse.users && Array.isArray(userResponse.users)) {
					
					if (userResponse.users) {
						dispatch({
							type: UserActionType.GET_USERS_SUCCESS,
							payload: [...userResponse.users]
						});

						setNextPage(nextPage + 1);
					}
				}
			})
	}

    return (
        <div className="posts-view-container">

			<div className="posts-view-toolbar">
				<PostsToolBar handlerLoadMoreClick={handlerLoadMoreClick}/>
			</div>

			<div className="posts-view-content">
				<div className="posts-view-users">
					<UserBoxList users={users} />
				</div>

				<div className="posts-view-posts">
					<PostBoxList posts={posts} />
				</div>
			</div>
            

        </div>
    )

}

export default PostView;
