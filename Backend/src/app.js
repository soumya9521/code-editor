import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { Socket } from "dgram";

dotenv.config({
  path: "./src/.env",
});
const PORT = process.env.port || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

function executeCode(code) {
  let output = "";

  // Override console.log to capture output
  const originalConsoleLog = console.log;
  console.log = function (...args) {
    output += args.join(" ") + "\n";
  };

  // Execute user code
  try {
    eval(code);
  } catch (error) {
    output += error.toString() + "\n";
  }

  console.log = originalConsoleLog; // Restore original console.log

  return output;
}

io.on("connection", (socket) => {
  console.log("New client connection established ", socket.id);
  socket.on("execute", (code) => {
    console.log("Please wait until execution is complete");

    const result = executeCode(code);
    console.log(result);
    setTimeout(() => {
      socket.emit("result", result);
    }, 1000);
  });
  socket.on("disconnect", (socket) => {
    console.log("Socket disconnected");
  });
});
