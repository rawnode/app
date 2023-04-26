
require('dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable}  = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
const find = (collection = '635919e22bc9cdd44701eedb', db = connect('cities')) => {
  
    const collections = db[collection].find({});

    const all = [];

    collections.forEach(collection => all.push(collection));

    let path = dataJsonFilePath('/databases/635919e22bc9cdd44701eedb.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/635919e22bc9cdd44701eedb-1682529167693.json');

    Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
}

find('635919e22bc9cdd44701eedb');
