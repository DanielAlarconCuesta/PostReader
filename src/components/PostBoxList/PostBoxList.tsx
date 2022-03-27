import React, { useState, useEffect } from "react";

import PostBoxListProps from "../../interfaces/PostBoxListProps";
import PostBox from "../PostBox/PostBox";
import Post from "../../interfaces/Post";

import { RootState } from "../../store";
import { useSelector  } from 'react-redux';

import "./PostBoxList.css";

function PostBoxList(postBoxListProps: PostBoxListProps) {

    const postFilter: string = useSelector<RootState, string>((state) => state.toolBar.postFilter);

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        
        if (postBoxListProps.posts) {
            setPosts(filterByPostMessage(postBoxListProps.posts.slice(0)));

        } else {
            setPosts([]);
        }

    }, [postBoxListProps.posts, postFilter])

    const filterByPostMessage = ((posts: Post[]): Post[] => {
        
        if (!posts) {
            return [];
        
        } else if (!postFilter) {
            return posts;
        }

        let filteredPosts:  Post[] = posts.filter((post: Post) => {

            if (post.message.includes(postFilter)) return true;
            else return false;
        })

        return filteredPosts;
    })

    return (
        <div className="post-box-list-container">

            <div className="post-box-list-posts">
                {posts.map((post: Post) => (
                    <PostBox
                    key={post.id} 
                        post={post}
                    /> 
                ))}
            </div>

        </div>
    )
}

export default PostBoxList;
