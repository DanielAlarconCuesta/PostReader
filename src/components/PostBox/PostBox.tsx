import React from "react";
import PostBoxProps from "../../interfaces/PostBoxProps";
import "./PostBox.css";

function PostBox(postBoxProps: PostBoxProps) {

    const formatDate = (stringDate: string): string => {

        let formatDateText = "";

        try {

            let date = new Date(stringDate);

            let month = date.toLocaleString('default', { month: 'long' }),
                day = date.getUTCDate(),
                year = date.getUTCFullYear(),
                hour = date.getUTCHours(),
                minute = date.getUTCMinutes(),
                second = date.getUTCSeconds();

            formatDateText = `${month} ${day}, ${year} ${hour}:${minute}:${second}`;

        } catch(error) {
            formatDateText = "Unknown Date";
        }

        return formatDateText;
    }

    return (
        <div className="post-box-container">

            <div className="post-box-date">
                {formatDate(postBoxProps?.post?.created_time)}
            </div>

            <hr className="post-box-hr" />

            <div className="post-box-message">
                <p>
                    {postBoxProps?.post?.message || ""}
                </p>
                
            </div>

        </div>
    )
}

export default PostBox;
