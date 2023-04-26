"use strict";

require('dotenv').config();

exports.find = (collection = 'cities', url = process.env.DB_URL ) => `
require('dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable}  = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
const find = (collection = '${collection}', db = connect('${url}')) => {
  
    const collections = db[collection].find({});

    const all = [];

    collections.forEach(collection => all.push(collection));

    let path = dataJsonFilePath('/databases/${collection}.json');
    if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

    Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
}

find('${collection}');
`

exports.findOne = (collection = 'cities', url = process.env.DB_URL ) => `
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

exports.findOneLatest = (collection = 'cities', url = process.env.DB_URL ) => `
require('dotenv').config();

const {createWriteStream, existsSync} = require('fs');
const {Readable}  = require('stream');

const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
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

