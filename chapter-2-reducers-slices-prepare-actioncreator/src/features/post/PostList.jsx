import React from "react";

import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList = () => {
    // const posts = useSelector((state) => state.posts);

    // const posts = useSelector((state) => {
    //     console.log("🚀 ~ file: PostList.jsx:6 ~ posts ~ state", state);
    //     return state.posts;
    // });

    const posts = useSelector(selectAllPosts);

    const renderedPosts = posts.map((post) => {
        return (
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p className="postCredit">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timeStamp={post.date} />
                </p>
                <ReactionButtons post={post} />
            </article>
        );
    });
    return (
        <div>
            <h2>--- All Posts ---</h2>
            {renderedPosts}
        </div>
    );
};

export default PostList;
