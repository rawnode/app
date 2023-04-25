const { createWriteStream, existsSync, unlink } = require('fs')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const {cleaner} = require('../helpers');
const {findByIdBuild} = require('../builder')

exports.execFindByIdQuery  = async ( filePath = './databases/findById.js') => {
    const { stdout, stderr } = await exec(`mongosh --file  ${filePath}`);
    const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;
    let str = stdout.match(regex)[0];
    let strs =  Array.from(cleaner(str));
    strs.pop();
    strs.shift();
    return findByIdBuild(cleaner(strs).split(','))
}


