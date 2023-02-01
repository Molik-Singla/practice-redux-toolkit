import React from "react";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostExcept = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timeStamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default PostExcept;
