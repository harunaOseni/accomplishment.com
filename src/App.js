import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Header, Post } from "./components";
import { db } from "./firebase";

function App() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    //listen for any changes to the posts collection in the firestore database and
    //update app state ==> "posts" with the modified post id and data (caption, image etc...)
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  console.log(posts);

  return (
    <div className="app">
      <Header />
      <div className="app__body">
        {posts.map((post) => (
          <Post
          key={post.id}
          postId={post.id}
            profilePicture={post.data.profilePicture}
            caption={post.data.caption}
            post={post.data.post}
            username={post.data.username}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
