import React from "react";

import AddPostForm from "./features/post/AddPostForm";
import PostList from "./features/post/PostList";

const App = () => {
    return (
        <div className="App">
            <AddPostForm />
            <PostList />
        </div>
    );
};

export default App;
