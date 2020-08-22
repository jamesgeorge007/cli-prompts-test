const enquirer = require('enquirer');

const choices = [
  'aqua',
  'black',
  'blue',
  'fuchsia',
  'green',
  'gray',
  'lime'
];

enquirer.prompt({
  type: 'multiselect',
  name: 'color',
  message: 'Pick your favorite colors',
  limit: 7,
  choices,
}).then(({color}) => {
  console.log(`You chose ${color.join(', ')}`);
});