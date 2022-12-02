let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        method: ("GET", "POST"),
      },
    });
    return io;
  },
  gitIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    } else {
      return io;
    }
  },
};
