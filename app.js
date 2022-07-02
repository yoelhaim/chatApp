const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT | 8080;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { isObject } = require("util");
const so = new Server(server);

so.on("connection", (Socket) => {
  Socket.on("msg", (m) => {
    console.log(m);
    so.emit("msg", m);
  });
  console.log("new user");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  res.render("index", {});
});

server.listen(port, () => console.log(`success conect server in port ${port}`));
