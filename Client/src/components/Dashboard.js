import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";

import TextField from "@material-ui/core/TextField";
import { CTX } from "../components/Store";
import { withAuth } from "../lib/AuthProvider";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: theme.spacing(3, 2),
    backgroundColor: "whitesmoke",
    borderRadius: 15,
    height: "80vh",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 0 10px 2px rgba(0,0,0,.3)",
  },

  flex: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },

  chatWindow: {
    height: "60vh",
    padding: "20px",
    backgroundColor: "whitesmoke",
  },

  chatBox: {
    width: "80%",
  },
  button: {
    width: "15%",
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const {
    allChats,
    sendChatAction,
    userName,
    userId,
    userImg,
  } = React.useContext(CTX);
  console.log({ allChats });
  const topics = Object.keys(allChats);

  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, changeTextValue] = useState("");
  return (
    <Paper className={classes.root}>
      <Typography component="h5" variant="h5">
        {activeTopic}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.chatWindow}>
          {allChats[activeTopic].map((chat, i) => (
            <div className="cardChat card" key={i}>
              <div className="d-flex  justify-content-between">
                {" "}
                <Avatar alt="Remy Sharp" src={chat.img} />
                <p className="text-dark text-muted">{chat.from} </p>
              </div>
              <Typography variant="body1" gutterBottom>
                {chat.msg}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          label="Send a Chat"
          className={classes.chatBox}
          value={textValue}
          onChange={(e) => changeTextValue(e.target.value)}
          margin="normal"
        />
        <button
          variant="contained"
          color="primary"
          className="btn-blueSwapit"
          onClick={() => {
            sendChatAction({
              from: userName,
              sender: userId,
              msg: textValue,
              topic: activeTopic,
              img: userImg,
            });
            changeTextValue("");
          }}
        >
          Send
        </button>
      </div>
    </Paper>
  );
}
export default withAuth(Dashboard);
