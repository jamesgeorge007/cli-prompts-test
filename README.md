# CLI Prompts Test

> Write e2e tests for CLI apps with ease.

## Installation

```bash
$ npm install --save-dev cli-prompts-test
```

## Usage

```js
// cli.js

const enquirer = require("enquirer");

const choices = ['First option', 'Second option', 'Third option'];

enquirer
  .prompt({
    type: "select",
    name: "option",
    message: "Choose from below",
    choices,
  })
  .then(({ option }) => {
    console.log(`You chose ${option}`);
  });
```

```js
// test.js

const runTest = require("cli-prompts-test");

const DOWN = "\x1B\x5B\x42";
const ENTER = "\x0D";

const cliPath = `${__dirname}/cli.js`;

describe("cli-prompts-test", () => {
  it("chooses first option", async () => {
    const { stdout } = await runTest(
      [cliPath],
      [ENTER]
    );
    expect(stdout).toContain("You chose First option");
  });

  it("chooses second option", async () => {
    const { stdout } = await runTest(
      [cliPath],
      [`${DOWN}${ENTER}`]
    );
    expect(stdout).toContain("You chose Second option");
  });

  it("chooses third option", async () => {
    const { stdout } = await runTest(
      [cliPath],
      [`${DOWN}${DOWN}${ENTER}`]
    );
    expect(stdout).toContain("You chose Third option");
  });
});
```