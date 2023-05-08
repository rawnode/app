
const { createWriteStream, existsSync, unlink } = require('fs')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);


const cleaner = (string = 'string') => { return Array.from(string).filter(el => (el.trim().length !== 0 && el.trim() !== `"` && el.trim() !== `'`)).join(''); }

const findByIdBuild = (results, data =  {})  => {
    for (let datum of results) {
        for (let el of datum.split(',')) {
            let index = el.indexOf(':');
            let key = el.substring(0, index).trim();
            let value = el.substring(index + 1).trim();
            data[key] = cleaner(value);
            if (Number.isInteger(parseInt(cleaner(el.substring(index + 1).trim())))) {
                data[key] = Number(parseInt(cleaner(el.substring(index + 1).trim())));
            } else {
                data[key] = cleaner(el.substring(index + 1).trim()).toString()
            }
           
        }
    }
    return data
}
const  findByIdQuery  = async ( filePath = './databases/findById.js') => {
    const { stdout, stderr } = await exec(`mongosh --file  ${filePath}`);
    const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;
    let str = stdout.match(regex)[0];
    let strs =  Array.from(cleaner(str));
    strs.pop();
    strs.shift();
    return findByIdBuild(cleaner(strs).split(','))
}


findByIdQuery().then(console.log)





