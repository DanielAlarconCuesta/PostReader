import React, { useState } from "react";

import { GrUpdate } from "react-icons/gr";
import { MdOutlineUpdate } from "react-icons/md";

import { ToolBarActionType, ToolBarAction } from '../../actions/toolBarActions';
import { useDispatch, useSelector  } from 'react-redux';
import { RootState } from '../../store';

import PostsToolBarProps from "../../interfaces/PostsToolBarProps";
import "./PostsToolBar.css";

function PostsToolBar(postsToolBarProps: PostsToolBarProps) {

    const dispatch = useDispatch();
	const sortByNewest: boolean = useSelector<RootState, boolean>((state) => state.toolBar.sortByNewest);

    const [nameSearchTimeout, setNameSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [postSearchTimeout, setPostSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleNewestClick = () => {
        dispatch({
            type: ToolBarActionType.SORT_BY_NEWEST,
            payload: true
        });
    }

    const handleLoadMoreClick = () => {

        if (postsToolBarProps.handlerLoadMoreClick) {
            postsToolBarProps.handlerLoadMoreClick();
        }
    }

    const handleOldestClick = () => {
        dispatch({
            type: ToolBarActionType.SORT_BY_NEWEST,
            payload: false
        });
    }

    const handleUserSearchOnChange = (event: React.FormEvent<HTMLInputElement>) => {

        if (nameSearchTimeout) {
            clearTimeout(nameSearchTimeout);
            setNameSearchTimeout(null);
        }

        let userName: string = event?.currentTarget?.value || "";

        setNameSearchTimeout(setTimeout(() => {
            dispatch({
                type: ToolBarActionType.FILTER_BY_NAME,
                payload: userName
            });
        }, 500));
    }

    const handlePostSearchOnChange = (event: React.FormEvent<HTMLInputElement>) => {

        if (postSearchTimeout) {
            clearTimeout(postSearchTimeout);
            setPostSearchTimeout(null);
        }

        let postName: string = event?.currentTarget?.value || "";

        setPostSearchTimeout(setTimeout(() => {
            dispatch({
                type: ToolBarActionType.FILTER_BY_POST,
                payload: postName
            });
        }, 500));
    }

    return (
        <div className="posts-toolbar-container">
            
            <div className="posts-toolbar-users-search">
                <input 
                    placeholder="Filter By User" 
                    onChange={handleUserSearchOnChange}
                />
            </div>

            <div className="posts-toolbar-update">
                <button
                    onClick={handleLoadMoreClick}
                >
                    <GrUpdate size={12} />
                    <span>  </span>
                    <span>Load More</span>
                    <span>  </span>
                    <GrUpdate size={12} />
                    
                </button>
            </div>

            <div className="posts-toolbar-posts-search">
                <input 
                    placeholder="Filter By Post" 
                    onChange={handlePostSearchOnChange}
                />
            </div>

            <div className="posts-toolbar-sort">
                <div className="posts-toolbar-icon">
                    <button 
                        title="Sort By Newest"
                        onClick={handleNewestClick}
                    >
                        <MdOutlineUpdate 
                            color={ sortByNewest ? "#dca3ff" : "#dedede"} 
                            size={40}
                        />
                    </button>
                    
                </div>

                <div className="posts-toolbar-icon">

                    <button 
                        title="Sort By Oldest"
                        onClick={handleOldestClick}
                    >
                        <MdOutlineUpdate 
                            color={ !sortByNewest ? "#dca3ff" : "#dedede"} 
                            size={40} 
                            style={{transform: "rotateX(180deg)"}}
                        />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default PostsToolBar;
