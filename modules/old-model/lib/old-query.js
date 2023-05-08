const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const clearner = string => Array.from(string).filter(el => (el.trim().length !== 0 && el.trim() !== `"` && el.trim() !== `'`)).join('');
const ObjectId = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
    const random = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const counter = (ObjectId.counter++ % 16777216).toString(16).padStart(6, '0');
    return timestamp + random + counter;
}
const stdoutRegex = (data = '', regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm, index = 0) => stdout.match(regex)[index]
const objectRegex = (string = 'string') => str.match(/{(.*?)}/gs);
const stdoutResults = () => matches ? matches.map(match => match.slice(1, -1)) : null;
ObjectId.counter = 0;

const queryExec = async (filePath = './db.js') => {
    const { stdout, stderr } = await exec(`mongosh --file  ${filePath}`);
    const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;
    const str = stdout.match(regex)[0];
    const matches = str.match(/{(.*?)}/gs);
    return matches ? matches.map(match => match.slice(1, -1)) : null;
}

const query = (results, data = []) => {
    for (let datum of results) {
        let single = {}
        for (let el of datum.split(',')) {
            single['id'] = ObjectId();
            let index = el.indexOf(':')
            let key = el.substring(0, index).trim();

            if (Number.isInteger(parseInt(clearner(el.substring(index + 1).trim())))) {
                single[key] = Number(parseInt(clearner(el.substring(index + 1).trim())));
            } else {
                single[key] = clearner(el.substring(index + 1).trim()).toString()
            }
            data.push(single)
        }
    }
    return data;
}

module.exports = async () => query(await queryExec())