require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const auth = require("./routes/auth");
var productRouter = require("./routes/product-routes");
var userRouter = require("./routes/user-routes");
var profileImage = require("./routes/file-upload-routes");
const Chat = require("./models/Chat");

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.error(err));

// EXPRESS SERVER INSTANCE

const app = express();

var http = require('http').createServer(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg){
    console.log("message:" + JSON.stringify(msg));
    io.emit("chat message", msg)
    let  chatMessage  =  new Chat({ message: msg.msg,  sender:msg.sender});
    chatMessage.save();
  })
});

http.listen(3001, function(){
  console.log('listening on port 3001')
})
app.use(
  session({
    store: new MongoStore({
      autoRemove: "interval",
      autoRemoveInterval: 10,
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    name: "userCookie",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    },
  })
);

// CORS MIDDLEWARE SETUP
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://swap-it-app.herokuapp.com"],
  })
);

// SESSION MIDDLEWARE

// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTER MIDDLEWARE
app.use("/auth", auth);
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", profileImage);


// ERROR HANDLING
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: "not found" });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || "500";
    res.status(statusError).json(err);
  }
});

module.exports = app;
