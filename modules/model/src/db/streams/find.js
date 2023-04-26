
require('../dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable}  = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
const find = (collection = 'cities', db = connect(process.env.DB_URL)) => {
  
    const collections = db[collection].find({});

    const all = [];

    collections.forEach(collection => all.push(collection));

    let path = dataJsonFilePath(`/databases/${collection}.json`);
    if(existsSync(path)) path = dataJsonFilePath(`/databases/${collection}-${Date.now()}.json`);

    Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
}

find('cities');
// console.log(process.env)


