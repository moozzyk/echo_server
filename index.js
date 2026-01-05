const net = require("node:net");

function createServer() {
  return net.createServer((socket) => {
    socket.on("data", (data) => {
      socket.write(data);
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
