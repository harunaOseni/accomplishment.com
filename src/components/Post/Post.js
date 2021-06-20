import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";
import { auth, db } from "../../firebase";
import { IconButton } from "@material-ui/core";
import StarsIcon from '@material-ui/icons/Stars';

function Post({ profilePicture, username, caption, post, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [currentlySignedInUser, setCurrentlySignedInUser] = useState(null);
  const [support, setSupport] = useState(0);
  const [supports, setSupports] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentlySignedInUser(authUser);
        console.log(authUser);
      } else {
        setCurrentlySignedInUser(null);
      }
    });
  });

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((snapshot) => {
        setSupports(snapshot.docs.map((doc) => doc.data()));
      });
  });

  function handleComment(event) {
    setComment(event.target.value);
  }

  function handlePostComment(event) {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: currentlySignedInUser.displayName,
    });

    setComment("");
  }

  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePicture} className="post__avatar" />
        <h4>{username}</h4>
      </div>

      <div className="post__image">
        <img src={post} alt="" />
      </div>

      <div className="support__postSection">
        {currentlySignedInUser && (
          <IconButton onClick={handleSupportAction}> 
            <StarsIcon /> 
          </IconButton>
        )}
      </div>

      <div className="post__caption">
        <p>
          <strong>{username} </strong>
          {caption}
        </p>
      </div>

      <div className="comment__section">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong> {comment.comment}
          </p>
        ))}
      </div>

      <form className="comment__postSection">
        <input
          type="text"
          placeholder={`Add a comment...`}
          disable={!currentlySignedInUser}
          value={comment}
          onChange={handleComment}
          className="comment__input"
        />

        <button
          className="comment__button"
          disable={!comment}
          type="submit"
          onClick={handlePostComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
