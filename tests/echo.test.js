const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");

const { createTcpServer, createUdpServer } = require("../index.js");

class FakeSocket extends EventEmitter {
  constructor() {
    super();
    this.writes = [];
  }

  write(data) {
    this.writes.push(data);
  }
}

test("echoes back data over TCP", () => {
  const server = createTcpServer();
  const socket = new FakeSocket();

  server.emit("connection", socket);
  socket.emit("data", Buffer.from("ping"));

  assert.equal(socket.writes.length, 1);
  assert.equal(socket.writes[0].toString(), "ping");
});

test("echoes back data over UDP", () => {
  const server = createUdpServer();
  const sends = [];
  const payload = Buffer.from("pong");
  const rinfo = { address: "127.0.0.1", port: 41234 };

  server.send = (message, port, address) => {
    sends.push({ message, port, address });
  };

  server.emit("message", payload, rinfo);

  assert.equal(sends.length, 1);
  assert.equal(sends[0].message.toString(), "pong");
  assert.equal(sends[0].port, rinfo.port);
  assert.equal(sends[0].address, rinfo.address);
});
