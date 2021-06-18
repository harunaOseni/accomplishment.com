import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

function Post({profilePicture, username, caption, post}) {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePicture} />
        <h4>{username}</h4>
      </div>

      <div className="post__image">
        <img
          src={post}
          alt=""
        />
      </div>

      <div className="post__caption">
        <p>
          <strong>{username} </strong>{caption}
        </p>
      </div>
    </div>
  );
}

export default Post;
