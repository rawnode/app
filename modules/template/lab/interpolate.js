const Activation = require('../mail/User/Password');
const activation = new Activation({data: {firstname: 'John', lastname: 'Does', email: 'ericson.weah@gmail.com'}}) 
activation.Mail()











// const {createReadStream} = require('fs');
// const readable = createReadStream('../resources/mail/activation.html', {encoding: 'utf-8'});

// readable.on('data', chunk => {
//     var replace = "(?<=\{\{).*?(?=\}\})";
//     var re = new RegExp(replace,"g");
//     console.log(chunk.toString().replace(re, string => 'ok cool'))
// })
// readable.on('error', error => console.log(error));
// readable.on('end', () => console.log('done!'));

// console.log(new Regex("\{{([^}]+)\}}").Match("dfdf{{456gfd}}3453").Groups[1])

// const replacer = (prop, options) => options[prop];

// const user = {name: 'John Doe', email: 'ericson.weah@gmail.com'};

// console.log(replacer('name', user))

