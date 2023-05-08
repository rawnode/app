require('dotenv').config();
module.exports = (collection = 'cities', url = process.env.DB_URL ) => `
require('dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable}  = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
const findOne = (collection = '${collection}', db = connect('${url}')) => {
  
    const data = db[collection].findOne();


    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
}

findOne('${collection}');
`