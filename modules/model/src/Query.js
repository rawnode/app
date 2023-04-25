#!/usr/bin/env node

"use strict";

/**
/**
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev
 * 
 * @module Query
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Query class
 */


const { createWriteStream, existsSync, unlink } = require('fs')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

class Query extends require("../../base") {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

        arrayOfObjects.forEach(option => {
            if (Object.keys(option).length > 0) {
                Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
            }
        });

        // auto bind methods
        this.autobind(Query);
        // auto invoke methods
        this.autoinvoker(Query);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
        this.ObjectId.counter = 0;
    }

    path(path = '', base = process.cwd()) {
        return require('path').join(base, path)
    }

    cleaner(string) { return Array.from(string).filter(el => (el.trim().length !== 0 && el.trim() !== `"` && el.trim() !== `'`)).join(''); }
    ObjectId() {
        const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
        const random = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
        const counter = (this.ObjectId.counter++ % 16777216).toString(16).padStart(6, '0');
        return timestamp + random + counter;
    }
    stdoutRegex(data = '', regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm, index = 0) { stdout.match(regex)[index] }
    objectRegex(string = 'string') { str.match(/{(.*?)}/gs); }
    stdoutResults() { matches ? matches.map(match => match.slice(1, -1)) : null; }


    async queryExec(filePath = this.path('/databases/find.js'), results = []) {

        const { stdout, stderr } = await exec(`mongosh --file  ${filePath}`);
        const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;

        if(stdout.match(regex) && stdout.match(regex) [0]){
            const str = stdout.match(regex)[0];
            const matches = str.match(/{(.*?)}/gs);
            return matches ? matches.map(match => match.slice(1, -1)) : null;
        }
        return results;
        
        
    }

    async query (path = this.path('/databases/find.js'), collection = this.collection, db = this.db){

        if (existsSync(path)) path = `${path.split('.js')[0]}-${Date.now()}.js`;

        const writable = createWriteStream(path, 'utf8');
        writable.write(`const db = connect("${db}");\n`)
        writable.write(`printjson(db.${collection}.find({}).pretty());\n`)
        writable.end();
    }
    async promise (path = this.path('/databases/all.js'), results = []){
        return await new Promise((resolve, reject) => {
            unlink(path, err => {
                if (err) {
                    this.emit('get-error', err);
                    reject({ error: 'Error getting data', })
                }
                resolve(this.build(results))
            });
        })
    }

  build(results, data = []) {
        for (let datum of results) {
            let single = {}
            for (let el of datum.split(',')) {
                single['id'] = this.ObjectId();
                let index = el.indexOf(':');
                let key = el.substring(0, index).trim();
                let value = el.substring(index + 1).trim();

                single[key] = this.cleaner(value);
                if (Number.isInteger(parseInt(this.cleaner(el.substring(index + 1).trim())))) {
                    single[key] = Number(parseInt(this.cleaner(el.substring(index + 1).trim())));
                } else {
                    single[key] = this.cleaner(el.substring(index + 1).trim()).toString()
                }
                data.push(single)
            }
        }

        return data;
    }



    async create(data = {}, path = process.cwd() + '/databases/create.js', collection = this.collection, db = this.db) {
        if (existsSync(path)) path = `${path.split('.js')[0]}-${Date.now()}.js`;
        const writable = createWriteStream(path, 'utf8');
        writable.write(`const db = connect("${db}");\n`)
        writable.write(`db.${collection}.insertOne( ${JSON.stringify(data)} );\n`)
        writable.end();
        const { stdout, stderr } = await exec(`mongosh --file  ${path}`);
        // console.log('stdout: ' + stdout);
        // console.log('stderr: ' + stderr);
        unlink(path, err => {
            if (err) return console.log('Error creating user: ' + err.message)
            return console.log('User created successfully')
        });

    }


    async getAll(path = this.path('/databases/all.js'), collection = this.collection, db = this.db) {

        if (existsSync(path)) path = `${path.split('.js')[0]}-${Date.now()}.js`;

        const writable = createWriteStream(path, 'utf8');
        writable.write(`const db = connect("${this.connection}/${db}");\n`)
        writable.write(`printjson(db.${collection}.find({}).pretty());\n`)
        writable.end();
        const { stdout, stderr } = await exec(`mongosh --file  ${path}`);
        const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;
        
        const str = stdout.match(regex)[0];
        const matches = str.match(/{(.*?)}/gs);
        const results = matches ? matches.map(match => match.slice(1, -1)) : null;

        const data = await new Promise((resolve, reject) => {
            unlink(path, err => {
                if (err) {
                    this.emit('getAll-error', err);
                    reject({ error: 'Error getting data', })
                }
                this.emit('getAll-success', results);
                resolve(this.build(results))
            });
        })
        return data;

    }

  
    async find(collection = this.collection, db = this.db, path = this.path('/databases/find.js')) {
        await this.query(path, collection, db)
        const results = await this.queryExec(path)
        return await this.promise(path, results);
    }

    async findByIdQuery (id = '', path = this.path('/databases/findById.js'), collection = this.collection, db = this.db){

        if (existsSync(path)) path = `${path.split('.js')[0]}-${Date.now()}.js`;

        const writable = createWriteStream(path, 'utf8');
        writable.write(`const db = connect("${this.connection}/${db}");\n`)
        writable.write(`printjson(db.${collection}.findOne({_id: ObjectId("${id}")}));\n`)
        writable.end();
    }
    async findById (id = '635919e22bc9cdd44701ee8a', path = this.path('/databases/findById.js'), collection = this.collection, db = this.db) {
        await this.findByIdQuery(id, path, collection, db)
        const results = await this.queryExec(path)
        return await this.promise(path, results);
    }
    async findByEmail(){}
    async findByPhone(){}
    async findByUsername(){}
    async createMany(){}
    async update(){}
    async deleteMany(){}
    async deleteOne(){}
    async updateOne(){}

    /**
   * @name count
   * @function
   *
   * @param {String} table database table name
   *
   * @description count records in the given table
   *
   * @return {Object|Array}  all record found
   *
   */

  async count (table = this.table || 'members') {
    const count = await new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) AS count FROM ${table}`, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count);
        }
      });
    });
    return count;
  }
  config(){
    if(!this.db) this.db = process.env.DB_NAME
    if(!this.connection) this.connection = process.env.DB_CONNECTION
    if(this.connection && this.url && this.db) this.url  = `${this.connection}/${this.db}`
    if(!this.url) this.url = process.env.DB_URL
    if(!this.collection) this.collection = 'users';
    // if(!this.url) this.url = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`
  }

    /**
     * @name autoinvoked
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     *
     * @description auto sets the list of methods to be auto invoked
     *
     * @return does not return anything
     *
     */
    autoinvoked() {
        return ['config'];
    }
}

module.exports = Query;



