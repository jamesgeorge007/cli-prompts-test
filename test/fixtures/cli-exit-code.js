const enquirer = require("enquirer");

enquirer
  .prompt({
    type: "input",
    name: "text",
    message: "Please input some text",
  })
  .then(({ text }) => {
    if (!text) {
      console.error("Invalid input");
      process.exit(1);
    }
    console.log(text);
  });
