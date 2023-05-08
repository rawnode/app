const {writeFile, writeFileSync, readFile, readFileSync, unlink, existsSync} = require('fs')

const db = connect('mongodb://localhost:27017/mongosh');

const collections = db.collection.find();

const all  = []

collections.forEach(collection => all.push(collection))

let path = `${collections}.json`
if(existsSync(path)) path = `${collections}-${Date.now()}.json`

writeFileSync(path, JSON.stringify(all));