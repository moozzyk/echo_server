const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");

const { createServer } = require("../index.js");

class FakeSocket extends EventEmitter {
  constructor() {
    super();
    this.writes = [];
  }

  write(data) {
    this.writes.push(data);
  }
}

test("echoes back data", () => {
  const server = createServer();
  const socket = new FakeSocket();

  server.emit("connection", socket);
  socket.emit("data", Buffer.from("ping"));

  assert.equal(socket.writes.length, 1);
  assert.equal(socket.writes[0].toString(), "ping");
});
