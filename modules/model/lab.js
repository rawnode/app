const str = require('./string');


const index = str.indexOf('[')

const first = str.slice(index);
const lastIndex = first.lastIndexOf(']');

first.slice(lastIndex)

const result = first.split('Type "it" for more')[0];

console.log(result);

