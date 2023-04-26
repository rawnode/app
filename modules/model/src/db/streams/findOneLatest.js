const {createReadStream, createWriteStream, existsSync} = require('fs');
const {Readable, Writable}  = require('stream');

const db = connect('mongodb://localhost:27017/city');

const cities = db.cities.find({});

const all  = []

cities.forEach(city => all.push(city))

let path = `cities.json`
if(existsSync(path)) path = `cities-${Date.now()}.json`

Readable.from(JSON.stringify(all[all.length -1 ])).pipe(createWriteStream(path, 'utf-8'))