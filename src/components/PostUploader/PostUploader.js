import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import "./PostUploader.css";
import firebase from "firebase";
import { db, storage } from "../../firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#E2703A",
    border: "2px solid #9C3D54 ",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PostUploader({ currentlySignedInUser }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  function handleCaption(event) {
    setCaption(event.target.value);
  }

  function handleImage(event) {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }

  function handleUpload() {
    //Push image to selected to firebase storage.
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Take a snapshot of every progress from local machine to firebase storage
        //from a zero (starting point) to a hundred (finishing point)
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              username: currentlySignedInUser.displayName,
              profilePicture: currentlySignedInUser.photoURL,
              post: url,
            });
          });
      }
    );

    setProgress(0);
    setCaption(""); 
    setImage(null)
    
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <div className="post__uploader">
        <progress
          value={progress}
          max="100"
          className="imageupload__progress"
        />

        <input
          type="text"
          placeholder="Enter your caption..."
          value={caption}
          onChange={handleCaption}
          className="caption__input"
        />
        <input type="file" onChange={handleImage} className="file__input" />
        <Button type="submit" onClick={handleUpload} className="upload__button">
          Post Accomplishment!
        </Button>
      </div>
    </div>
  );
}

export default PostUploader;
