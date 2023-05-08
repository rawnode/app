"use strict";

require('dotenv').config();

const common = () => `
require('dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable} = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
`

// exports.insertOne = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.insertMany = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.updateOne = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.updateMany = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.findAndModify = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.findOneAndUpdate = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.findOneAndReplace = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.updateOne = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.updateMany = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.replaceOne = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.deleteOne = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.deleteMany = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.findOneAndDelete = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.findAndModify = (collection = 'cities', url = process.env.DB_URL) => {}

// exports.createIndex = (collection = 'cities', url = process.env.DB_URL) => {}
// exports.drop() = (collection = 'cities', url = process.env.DB_URL) => {}


const  findQueryString = () => `

${common()}

const find = (query = query, collection = '${collection}', db = connect('${url}')) => {

  const collections = db[collection].find();

  const all = [];

  collections.forEach(collection => all.push(collection));

  let path = dataJsonFilePath('/databases/${collection}.json');
  if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

  Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
}

find('${collection}');
`

exports.find = (query = {}, projection = {},collection = 'cities', url = process.env.DB_URL ) => {
    if (query && typeof query !== "object") {
        this.emit("awaitFind-error", { error: "input query must be an object" });
        this.emit("find-error", { error: "input query must be an object" });
        return { error: "input query must be an object" };
      }
      if (projection && typeof projection !== "object") {
        this.emit("awaitFind-error", {
          error: "projection query must be an object",
        });
        this.emit("find-error", {
          error: "projection query must be an object",
        });
        return { error: "projection query must be an object" };
      }
}



// exports.find = (query = {}, collection = 'cities', url = process.env.DB_URL ) => `

//   ${common()}

// const find = (query = query, collection = '${collection}', db = connect('${url}')) => {
  
//     const collections = db[collection].find(${query});

//     const all = [];

//     collections.forEach(collection => all.push(collection));

//     let path = dataJsonFilePath('/databases/${collection}.json');
//     if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

//     Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
// }

// find('${collection}');
// `

exports.findOne = (collection = 'cities', url = process.env.DB_URL ) => `

${common()}

const findOne = (collection = '${collection}', db = connect('${url}')) => {
  
    const data = db[collection].findOne();


    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
}

findOne('${collection}');
`

exports.findOneLatest = (collection = 'cities', url = process.env.DB_URL ) => `

${common()}
  
const findOneLatest = (collection = '${collection}', db = connect('${url}')) => {
  
    const collections = db[collection].find({});

    const all = [];

    collections.forEach(collection => all.push(collection));

    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(all[all.length - 1])).pipe(createWriteStream(path, 'utf-8'));
}

findOneLatest('${collection}');
`
exports.findById = (id = '635919e22bc9cdd44701eedb', collection = 'cities', url = process.env.DB_URL ) => `

${common()}

const findById = ( id = '${id}',collection = '${collection}', db = connect('${url}')) => {
  
    const data = db[collection].findOne({_id: ObjectId("${id}")});

    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
}

findById('${id}','${collection}');
`

exports.findByCode = (code = 'KP', collection = 'cities', url = process.env.DB_URL ) => `

${common()}
  
const findByCode = ( code = '${code}',collection = '${collection}', db = connect('${url}')) => {
  
    const data = db[collection].findOne({code: "${code}"});

    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
}

findByCode('${code}','${collection}');
`


exports.findByEmail = (email = 'KP', collection = 'cities', url = process.env.DB_URL ) => `
  
${common()}

const findByEmail = ( email = '${email}',collection = '${collection}', db = connect('${url}')) => {
  
    const data = db[collection].findOne({email: "${email}"});

    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
}

findByEmail('${email}','${collection}');
`

exports.findByUsername = (username = 'zstoltenberg', collection = 'cities', url = process.env.DB_URL ) => `
  
${common()}

const findByUsername = ( username = '${username}',collection = '${collection}', db = connect('${url}')) => {
  
    const data = db[collection].findOne({username: "${username}"});

    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
}

findByUsername('${username}','${collection}');
`





