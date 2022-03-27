import React, { useState, useEffect } from "react";

import UserBoxProps from "../../interfaces/UserBoxProps";
import "./UserBox.css";

function UserBox(userBoxProps: UserBoxProps) {

    const handleOnClick = () => {

        if (userBoxProps.onClickHandler) {
            userBoxProps.onClickHandler(userBoxProps.user);
        }
    }

    const [containerClass, setContainerClass] = useState<string>("");

    useEffect(() => {

        let classes = "user-container";

        if (userBoxProps.className) {
            classes += ` ${userBoxProps.className}`;
        }

        setContainerClass(classes);


    }, [userBoxProps.className])

    return (
        <div 
            className={containerClass} 
            onClick={handleOnClick}
        >
            <div className="user-name">
                <span>
                    {userBoxProps?.user?.name || ""}
                </span>
            </div>

            <div className="user-posts-number">
                <div className="user-posts-number-circle">
                    <span>
                        {userBoxProps?.user?.posts ? userBoxProps.user.posts.length : 0}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserBox;
