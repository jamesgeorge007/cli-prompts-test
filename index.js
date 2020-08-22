const concat = require("concat-stream");
const execa = require("execa");

module.exports = (args, answers, options) => {
  // Defaults to process.cwd()
  const runnerOptions = options && options.testPath ? { cwd: testPath } : {};

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

    // Booleans to keep track of completion status
    let stdoutCompleted = false;
    let stderrCompleted = false;

    const resolveWithObj = () => {
      if (stdoutCompleted && stderrCompleted) {
        resolve(obj);
      }
    };

    runner.stdout.pipe(
      concat((result) => {
        stdoutCompleted = true;
        obj.stdout = result.toString();
        resolveWithObj();
      })
    );

    runner.stderr.pipe(
      concat((result) => {
        stderrCompleted = true;
        obj.stderr = result.toString();
        resolveWithObj();
      })
    );
  });
};
