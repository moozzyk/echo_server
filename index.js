const net = require("node:net");

function createServer() {
  return net.createServer((socket) => {
    const remote = `${socket.remoteAddress ?? "unknown"}:${socket.remotePort ?? "?"}`;
    console.log(`Client connected from ${remote}`);

    socket.on("data", (data) => {
      console.log(`Received ${data.length} bytes from ${remote}`);
      socket.write(data);
    });

    socket.on("error", (error) => {
      console.error(`Socket error from ${remote}:`, error.message);
    });

    socket.on("end", () => {
      console.log(`Client disconnected from ${remote}`);
    });
  });
}

function startServer(options = {}) {
  const port = Number(options.port ?? process.env.PORT ?? 7);
  const host = options.host ?? process.env.HOST ?? "0.0.0.0";
  const server = createServer();

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      server.off("error", reject);
      resolve(server);
    });
  });
}

if (require.main === module) {
  startServer()
    .then((server) => {
      const address = server.address();
      console.log(`Echo server listening on ${address.address}:${address.port}`);
    })
    .catch((error) => {
      console.error("Failed to start echo server:", error.message);
      process.exitCode = 1;
    });
}

module.exports = {
  createServer,
  startServer
};
