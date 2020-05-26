import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CTX } from "../components/Store";
import { withAuth } from "../lib/AuthProvider";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid gray",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const { allChats, sendChatAction, userName } = React.useContext(CTX);
  console.log({ allChats });
  const topics = Object.keys(allChats);

  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, changeTextValue] = useState("");
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h3">
        Chat
      </Typography>
      <Typography component="h5" variant="h5">
        {activeTopic}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List>
            {topics.map((topic) => (
              <ListItem
                onClick={(e) => changeActiveTopic(e.target.innerText)}
                key={topic}
                button
              >
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {allChats[activeTopic].map((chat, i) => (
            <div className="cardChat card" key={i}>
                <div className="d-flex  justify-content-between">  <Avatar alt="Remy Sharp" src={chat.img} />
              <p className="text-dark text-muted"  >{chat.from} </p>
                    
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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            sendChatAction({from:userName, img:props.user.imgPath, msg: textValue, topic: activeTopic});
            changeTextValue("");
          }}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
}
export default withAuth(Dashboard)
