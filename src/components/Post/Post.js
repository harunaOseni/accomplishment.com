import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";
import { auth, db } from "../../firebase";
import firebase from "firebase";

function Post({ profilePicture, username, caption, post, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [currentlySignedInUser, setCurrentlySignedInUser] = useState(null);
  const [open, setOpen] = useState(false);

  function handleToggleComment() {
    !open ? setOpen(true) : setOpen(false);
  }

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
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  function handleComment(event) {
    setComment(event.target.value);
  }

  function handlePostComment(event) {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: currentlySignedInUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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

      <div className="post__caption">
        <p>
          <strong>{username} </strong>
          {caption}
        </p>
      </div>

      <div className="comment__container">
        {open ? (
          <button
            className="commentCollapse__button"
            onClick={handleToggleComment}
          >
            Hide Support
          </button>
        ) : (
          <button
            className="commentCollapse__button"
            onClick={handleToggleComment}
          >
            Show Support
          </button>
        )}

        {open ? (
          <div className="comment__section">
            {comments.map((comment) => (
              <p>
                <strong>{comment.username} </strong> {comment.comment}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
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
          disabled={!comment && !currentlySignedInUser}
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
