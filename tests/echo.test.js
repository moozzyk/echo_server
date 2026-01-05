const test = require("node:test");
const assert = require("node:assert/strict");

const expectedOutput = "Hello, World!\n";

test("prints Hello, World!", async () => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(" ") + "\n");
  };

  try {
    require("../index.js");
  } finally {
    console.log = originalLog;
  }

  assert.equal(logs.join(""), expectedOutput);
});
