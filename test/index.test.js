"use strict";

import path from "path";

import runTest, { DOWN, ENTER, SPACE } from "..";

const fixturesPath = path.join(__dirname, "fixtures");
const cliPath = path.join(fixturesPath, "cli.js");
const cliExitCodePath = path.join(fixturesPath, "cli-exit-code.js");

describe("cli-prompts-test", () => {
  it("picks a single option", async () => {
    const { exitCode, stdout } = await runTest(
      [cliPath],
      [`${DOWN}${DOWN}${SPACE}${ENTER}`]
    );

    // Assertions
    expect(exitCode).toBe(0);
    expect(stdout).toContain("You chose blue");
  });

  it("picks multiple options", async () => {
    const { exitCode, stdout } = await runTest(
      [cliPath],
      [`${SPACE}${DOWN}${DOWN}${DOWN}${SPACE}${ENTER}${DOWN}${SPACE}${ENTER}`]
    );

    // Assertions
    expect(exitCode).toBe(0);
    expect(stdout).toContain("You chose aqua, fuchsia, green");
  });

  it("returns an exit code of 0", async () => {
    const { exitCode, stderr, stdout } = await runTest(
      [cliExitCodePath],
      ["sample text", ENTER]
    );

    // Assertions
    expect(exitCode).toBe(0);
    expect(stdout).toContain("sample text");
    expect(stderr).toBeFalsy();
  });

  it("returns an exit code of 1", async () => {
    const { exitCode, stderr } = await runTest([cliExitCodePath], [ENTER]);

    // Assertions
    expect(exitCode).toBe(1);
    expect(stderr).toContain("Invalid input");
  });
});
