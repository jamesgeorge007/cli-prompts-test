const concat = require("concat-stream");
const execa = require("execa");

/**
 * @param {string[]} args CLI args to pass in
 * @param {string[]} answers answers to be passed to stdout
 * @param {Object} [options] specify the testPath and timeout
 *
 * returns {Promise<Object>}
 */

module.exports = (args, answers, options) => {
  // Defaults to process.cwd()
  const runnerOptions =
    options && options.testPath ? { cwd: options.testPath } : {};

  // Timeout between each keystroke simulation
  const timeout = options && options.timeout ? options.timeout : 500;

  const runner = execa("node", args, runnerOptions);
  runner.stdin.setDefaultEncoding("utf-8");

  const writeToStdin = (answers) => {
    if (answers.length > 0) {
      setTimeout(() => {
        runner.stdin.write(answers[0]);
        writeToStdin(answers.slice(1));
      }, timeout);
    } else {
      runner.stdin.end();
    }
  };

  // Simulate user input (keystrokes)
  writeToStdin(answers);

  return new Promise((resolve) => {
    const obj = {};

    runner.stdout.pipe(
      concat((result) => {
        obj.stdout = result.toString();
      })
    );

    runner.stderr.pipe(
      concat((result) => {
        obj.stderr = result.toString();
      })
    );

    runner.on("exit", (exitCode) => {
      obj.exitCode = exitCode;
      resolve(obj);
    });
  });
};

module.exports.DOWN = "\x1B\x5B\x42";
module.exports.UP = "\x1B\x5B\x41";
module.exports.ENTER = "\x0D";
module.exports.SPACE = "\x20";
