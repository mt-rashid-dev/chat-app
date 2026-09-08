import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  autoConnect: false
});

export const connectSocket = (id) => {
  socket.io.opts.query = {
    userId: id
  };
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
};