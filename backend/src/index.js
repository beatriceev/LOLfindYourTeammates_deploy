import path from "path";

import express from "express";
import cors from "cors";
import WebSocket from "ws";

import mongo from "./mongo.js";
import yoga from "./server.js";

import "dotenv-defaults/config.js";

import mongoose from "mongoose";

import routes from "./routes/index.js";

import { createServer } from "@graphql-yoga/node";

import { dataInit } from "./upload.js";

const app = express();
app.use(cors());
// init middleware
if (process.env.NODE_ENV === "development") {
  console.log("develope");
  app.use(cors());
}
// define routes
app.use(express.json());
app.use("/", routes);
app.use("/graphql", yoga);

app.get("/api", (req, res) => {
  // send the request back to the client
  console.log("GET /api");
  res.send({ message: "Hello from the server!" }).status(200);
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

mongo.connect();

// define server
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
console.log(WebSocket.Server);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  // send a random number every seconds
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ number: Math.round(Math.random() * 100) }));
  }, 1000);

  // clear interval on close
  ws.on("close", () => {
    clearInterval(interval);
  });
});

dataInit();
