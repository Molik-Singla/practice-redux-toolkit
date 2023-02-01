import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import PostExcept from "./PostExcept";
import { selectAllPosts, getPostsStatus, getPostsErrror, fetchPosts } from "./postSlice";

const PostList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsErrror);

    useEffect(() => {
        if (postsStatus === "idle") dispatch(fetchPosts());
    }, []);

    let content;
    if (postsStatus === "loading") content = <p>Loading...</p>;
    else if (postsStatus === "succeeded") content = posts.map((post) => <PostExcept key={post.id} post={post} />);
    else if (postsStatus === "failed") content = <p>{postsError}</p>;

    return (
        <div>
            <h2>--- All Posts ---</h2>
            {content}
        </div>
    );
};

export default PostList;
