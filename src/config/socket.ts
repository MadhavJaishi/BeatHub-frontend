import io from "socket.io-client";

const socket = io("http://localhost:8099", {
  auth: {
    userId: localStorage.getItem("userId"),
  },
});

export default socket;
