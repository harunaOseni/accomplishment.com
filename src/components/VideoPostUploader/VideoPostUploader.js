import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import "./VideoPostUploader.css";
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
    width: "80%",
    backgroundColor: "#E2703A",
    border: "2px solid #9C3D54 ",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function VideoPostUploader({ currentlySignedInUser, closeModal, openModal }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  function handleCaption(event) {
    setCaption(event.target.value);
  }

  function handleVideoFile(event) {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
    }
  }

  function handleVideoUpload() {
    //Push image to selected to firebase storage.
    const uploadTask = storage.ref(`videos/${video.name}`).put(video);

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
          .ref("videos")
          .child(video.name)
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
    setVideo(null);
    closeModal();
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
        <input type="file" onChange={handleVideoFile} className="file__input" />
        <Button
          type="submit"
          onClick={handleVideoUpload}
          className="upload__button"
        >
          Post Accomplishment!
        </Button>
      </div>
    </div>
  );
}

export default VideoPostUploader;
