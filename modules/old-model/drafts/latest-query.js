writable.write(`const {createWriteStream, createReadStream, existsSync, unlink, readFile} = require('fs');;\n`)
writable.write(`const {Readable} = require('stream');\n\n`)
writable.write(`const db = connect("${connection}/${db}");\n`)
writable.write(`const ${collection} = db.${collection}.find({});\n\n`)

writable.write(`const all  = [];\n`)
writable.write(`${collection}.forEach(${collection.slice(0, -1)} => all.push(${collection.slice(0, -1)}));\n`)
writable.write(`let dataPath  = '${dataExecPath}';\n\n`)
writable.write(`if(existsSync(dataPath)){;\n`)
writable.write(`    dataPath = "${dataExecPath}";\n`)
writable.write(`}\n\n`)

writable.write(`const newWritable = createWriteStream(dataPath, 'utf-8');\n`)
writable.write(`Readable.from(JSON.stringify(all[all.length -1])).pipe(newWritable);\n`)
writable.end();