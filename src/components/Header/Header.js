import React, { useState } from "react";
import "./Header.css";
import { IconButton, Button, Input } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

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

  function handleSignUp() {} //triggers when sign up button is clicked

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

  return (
    <div className="header">
      <div className="app__logo">
        <h1>Accomplishment.com</h1>
      </div>
      <div className="add__postButton">
        <IconButton>
          <AddAPhotoIcon />
        </IconButton>
      </div>
      <div className="register__button">
        <Button type="submit" onClick={handleOpenSignIn}>
          Sign In
        </Button>
        <Button type="submit" onClick={handleOpen}>
          Sign Up
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signup__form ">
            <h1 className="logo__signupForm">Accomplishment.com</h1>
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
            <Input placeholder="Enter your email" />
            <Input placeholder="Enter your password" />
            <Button>Sign In</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
