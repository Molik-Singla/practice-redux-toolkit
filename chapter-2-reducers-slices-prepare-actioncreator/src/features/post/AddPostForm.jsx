import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectAllUsers } from "../user/userSlice";

import { postAdded } from "./postSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const handleSavePost = () => {
        if (title && content) {
            dispatch(
                // postAdded({
                //     id: nanoid(),
                //     title,
                //     content,
                // })

                postAdded(title, content, userId)
            );
            setTitle("");
            setContent("");
        }
    };

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {users.map((user) => {
                        return (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        );
                    })}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
                <button onClick={handleSavePost} type="button">
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
