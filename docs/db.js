const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const clearner = string => Array.from(string).filter(el => (el.trim().length !== 0 && el.trim() !== `"` && el.trim() !== `'`)).join('');
const ObjectId = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
    const random = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const counter = (ObjectId.counter++ % 16777216).toString(16).padStart(6, '0');
    return timestamp + random + counter;
}
ObjectId.counter = 0;

async function lsExample() {
    const { stdout, stderr } = await exec('mongosh --file ./index.js');
    const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;
    const str = stdout.match(regex)[0];
    const matches = str.match(/{(.*?)}/gs);
    const results = matches ? matches.map(match => match.slice(1, -1)) : null;
    const data = [];
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
    console.log(data)
}
lsExample();