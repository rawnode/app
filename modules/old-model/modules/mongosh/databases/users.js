

  
require('dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable} = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);


const find = (query = query, collection = 'users', db = connect('undefined')) => {
  
    const collections = db[collection].find([object Object]);

    const all = [];

    collections.forEach(collection => all.push(collection));

    let path = dataJsonFilePath('/databases/users.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/users-1682543042179.json');

    Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
}

find('users');
