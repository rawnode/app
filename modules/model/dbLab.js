

const { Readable } = require('stream')
const { createWriteStream, createReadStream, unlink, existsSync } = require('fs')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec)

const mongosh = require('mongosh');

const filePath = (path = '', base = process.cwd()) => require('path').join(base, path)

const executableFilePath  = (path = filePath('/databases/' + path), extension = 'js' ) => existsSync(`${filePath('/databases/' + path)}.${extension}`) ? `${filePath('/databases/' + path)}-${Date.now()}.${extension}` : `${filePath('/databases/' + path)}.${extension}`;


const promises = (path, jsonPath) => new Promise((resolve, reject) => {

    const readable = createReadStream(jsonPath, 'utf-8');

    readable.on('data', (data) => resolve(JSON.parse(data))
    );

    // Listen for the 'end' event to know when the stream has ended
    readable.on('end', () => {
        unlink(jsonPath, err => err ? reject(err): '');
        unlink(path, err => err ? reject(err): '');
        // console.log('Finished reading data from stream.');
    });
    // Listen for the 'error' event to handle any errors that occur during reading
    readable.on('error', (err) => reject(err));
})


const query = async (email, collection = 'users', path = executableFilePath(collection, 'js'), jsonPath = executableFilePath(collection, 'json')) => {
    
    Readable.from(mongosh.findByUsername(email, collection)).pipe(createWriteStream(path, 'utf-8'))

    const run = async (mongoshFile = path) => await exec(`mongosh --file ${mongoshFile}`);
    
    await run(path)

    return promises(path, jsonPath)


}
// console.log(query)

query('winifred.kiehn','users').then(console.log)


