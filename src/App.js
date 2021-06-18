import React from "react";
import "./App.css";
import { Header, Post } from "./components";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Post
          profilePicture="https://avatars.githubusercontent.com/u/61633659?v=4"
          username="they_call_me_noob"
          caption="I will make a great application like instagram someday!"
          post="https://firebasestorage.googleapis.com/v0/b/instagram-app-reactjs.appspot.com/o/images%2F5e9dcd4215ea4b57a81e3704.jfif?alt=media&token=4df7ab29-9b6b-409a-997d-802787eb3994"
        />

        <Post
          profilePicture="https://avatars.githubusercontent.com/u/61633659?v=4"
          username="they_call_me_noob"
          caption="I will have a clique such as this soon!"
          post="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz7Lzhnp_vw4k3qCGVi8S_DToDfIHuuSBsmA&usqp=CAU"
        />
      </div>
    </div>
  );
}

export default App;
