# CLI Prompts Test

> Write e2e tests for CLI apps with ease.

## Installation

```bash
$ npm install --save-dev cli-prompts-test
```

## API

### runTest(args, answers, options?)

- `args`: CLI args to pass in.
- `answers`: answers to be passed to `stdout` (simulate user input).
- `options`: Optionally specify the `testPath` (defaults to `process.cwd()`) and `timeout` (defaults to `500ms`) between keystrokes.

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

const runTest, { DOWN, ENTER } = require("cli-prompts-test");

const cliPath = `${__dirname}/cli.js`;

describe("cli-prompts-test", () => {
  it("picks first option", async () => {
    const { exitCode, stdout } = await runTest(
      [cliPath],
      [ENTER]
    );

    // Assertions
    expect(exitCode).toBe(0);
    expect(stdout).toContain("You chose First option");
  });

  it("picks second option", async () => {
    const { exitCode, stdout } = await runTest(
      [cliPath],
      [`${DOWN}${ENTER}`]
    );

    // Assertions
    expect(exitCode).toBe(0);
    expect(stdout).toContain("You chose Second option");
  });

  it("picks third option", async () => {
    const { exitCode, stdout } = await runTest(
      [cliPath],
      [`${DOWN}${DOWN}${ENTER}`]
    );

    // Assertions
    expect(exitCode).toBe(0);
    expect(stdout).toContain("You chose Third option");
  });
});
```

Find an example [here](https://github.com/madlabsinc/mevn-cli/blob/develop/jest/helpers.js).
