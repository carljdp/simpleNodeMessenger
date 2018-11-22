const express = require("express");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./server/views");

// STATICS -----------------------------------
app.use("/public", express.static("./public"));

// ROUTES ------------------------------------

// log response times
app.all("*", (req, res, next) => {
  console.time("totalResponseTime");
  console.log(`Request to ${req.url}`);
  next();
  console.timeEnd("totalResponseTime");
});

// app | home
app.get("/", (req, res) => res.render("index"));

// Catch all
app.all("*", (req, res) => {
  console.log("Unknown path, redirecting ..");
  res.redirect("/");
});

runServer(app, port);

// RUN ----------------------------------------

function runServer(app, port) {
  app.listen(port);
}
