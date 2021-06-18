import React, { useState } from "react";
import "./Header.css";
import { IconButton, Button, Input } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from "../../firebase";
import { useEffect } from "react";

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

function Header() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [currentlySignedInUser, setCurrentlySignedInUser] = useState(null);

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

  function handleSignUp(event) {
    //Signs in user and updates authenticated user display name with
    // user generated name
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
          PhotoUrl: profilePicture,
        });
      })
      .catch((error) => alert(error.message));

    //Close Modal
    handleClose();
    setEmail("");
    setPassword("");
    setUsername("");
    setProfilePicture("");
  }

  function handleSignIn(event) {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(`we have an error, ${error}`);
    });

    handleCloseSignIn();
    setEmail("");
    setPassword("");
  }

  function handleUsersProfilePicture(event) {
    setProfilePicture(event.target.value);
  }

  function handleClose() {
    setOpen(false); //close modal
  }

  function handleOpen() {
    setOpen(true); //open modal dialogue box
  }

  function handleOpenSignIn() {
    setOpenSignIn(true);
  }

  function handleCloseSignIn() {
    setOpenSignIn(false);
  }

  function handleUsersName(event) {
    setUsername(event.target.value);
  }

  function handleUsersEmail(event) {
    setEmail(event.target.value);
  }

  function handleUsersPassword(event) {
    setPassword(event.target.value);
  }

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        alert("Sign out succesfull");
      })
      .catch((error) => {
        alert(`There was an error loggin out ${error}`);
      });
  }

  return (
    <div className="header">
      <div className="app__logo">
        <h1>Accomplishment.com</h1>
      </div>
      {currentlySignedInUser ? (
        <>
          <div className="add__postButton">
            <IconButton>
              <AddAPhotoIcon />
            </IconButton>
          </div>
          <div className="register__button" onClick={handleSignOut}>
            LOG OUT
          </div>
        </>
      ) : (
        <div className="register__button">
          <Button type="submit" onClick={handleOpenSignIn}>
            Sign In
          </Button>
          <Button type="submit" onClick={handleOpen}>
            Sign Up
          </Button>
        </div>
      )}
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signup__form ">
            <h1 className="logo__signupForm">Accomplishment.com</h1>
            <Input
              type="text"
              placeholder="Enter your profile picture imageUrl"
              value={profilePicture}
              onChange={handleUsersProfilePicture}
            />
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsersName}
            />
            <Input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleUsersEmail}
            />
            <Input
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={handleUsersPassword}
            />
            <Button onClick={handleSignUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={handleCloseSignIn}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signin__form">
            <h1 className="logo__signupForm">Accomplishment.com</h1>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={handleUsersEmail}
            />
            <Input
              placeholder="Enter your password"
              value={password}
              onChange={handleUsersPassword}
            />
            <Button type="submit" onClick={handleSignIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
