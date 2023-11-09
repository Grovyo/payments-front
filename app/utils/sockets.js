import io from "socket.io-client";

const socket = io("http://192.168.29.211:4300");

socket.on("connection", () => {
  console.log("Socket connected");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

export default socket;
