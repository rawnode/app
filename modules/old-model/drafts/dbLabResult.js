require('dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable}  = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
const find = (collection = 'users', db = connect('mongodb://localhost:27017/city')) => {
  
    const collections = db[collection].find({});

    const all = [];

    collections.forEach(collection => all.push(collection));

    let path = dataJsonFilePath('/databases/users.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/users-1682515622126.json');

    Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
}

find('users');