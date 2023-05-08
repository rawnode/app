require('../../dotenv').config();

const { Readable } = require('stream')

const { createWriteStream, createReadStream, unlink, existsSync } = require('fs')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec)

const findModel = require('./find');

findModel('cities');