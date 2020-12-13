"use strict";

const runTest = require("../");

const DOWN = "\x1B\x5B\x42";
const ENTER = "\x0D";
const SPACE = "\x20";

const cliPath = `${__dirname}/fixtures/cli.js`;

describe("cli-prompts-test", () => {
  it("picks a single option", async () => {
    const { stdout, exitCode } = await runTest(
      [cliPath],
      [`${DOWN}${DOWN}${SPACE}${ENTER}`]
    );
    expect(exitCode).toBe(0);
    expect(stdout).toContain("You chose blue");
  });

  it("picks multiple options", async () => {
    const { stdout, exitCode } = await runTest(
      [cliPath],
      [`${SPACE}${DOWN}${DOWN}${DOWN}${SPACE}${ENTER}${DOWN}${SPACE}${ENTER}`]
    );
    expect(exitCode).toBe(0);
    expect(stdout).toContain("You chose aqua, fuchsia, green");
  });
});
