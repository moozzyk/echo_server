const dgram = require("node:dgram");
const net = require("node:net");

function createTcpServer() {
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

function createUdpServer() {
  const server = dgram.createSocket("udp4");

  server.on("message", (message, rinfo) => {
    const remote = `${rinfo.address}:${rinfo.port}`;
    console.log(`Received ${message.length} bytes via UDP from ${remote}`);
    server.send(message, rinfo.port, rinfo.address);
  });

  server.on("error", (error) => {
    console.error("UDP server error:", error.message);
  });

  return server;
}

async function startServer(options = {}) {
  const port = Number(options.port ?? process.env.PORT ?? 7);
  const host = options.host ?? process.env.HOST ?? "0.0.0.0";
  const protocol = (options.protocol ?? process.env.PROTOCOL ?? "tcp").toLowerCase();

  if (protocol === "tcp") {
    const tcpServer = createTcpServer();
    await new Promise((resolve, reject) => {
      tcpServer.once("error", reject);
      tcpServer.listen(port, host, () => {
        tcpServer.off("error", reject);
        resolve();
      });
    });
    return { protocol, server: tcpServer };
  }

  if (protocol === "udp") {
    const udpServer = createUdpServer();
    await new Promise((resolve, reject) => {
      udpServer.once("error", reject);
      udpServer.bind(port, host, () => {
        udpServer.off("error", reject);
        resolve();
      });
    });
    return { protocol, server: udpServer };
  }

  throw new Error(`Unsupported protocol: ${protocol}`);
}

if (require.main === module) {
  startServer()
    .then(({ protocol, server }) => {
      const address = server.address();
      console.log(
        `Echo server listening on ${address.address}:${address.port} (${protocol.toUpperCase()})`
      );
    })
    .catch((error) => {
      console.error("Failed to start echo server:", error.message);
      process.exitCode = 1;
    });
}

module.exports = {
  createTcpServer,
  createUdpServer,
  startServer,
};
