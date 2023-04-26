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
require('dotenv').config();
class Query extends require("base") {

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
        // this.methodizer(Query);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
    }

    path(path = '', base = process.cwd()) {
        return require('path').join(base, path)
    }

    async findQuery(collection  = this.collection, db = this.db, connection = this.connection, path = this.path('/databases/find.js'), dataExecPath = this.path('/databases/'+ `latest-${collection.slice(0, -1)}.json`)){
        const writable = createWriteStream(path, 'utf-8')
        writable.write(`const {createWriteStream, createReadStream, existsSync, unlink, readFile} = require('fs');\n`)
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
        writable.write(`Readable.from(JSON.stringify(all)).pipe(newWritable);\n`)
        writable.end();
      }
    

    /**
   * @name autobinder
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets and auto binds every and all methods for the corresponding class (except the constructor)
   *
   * @return does not return anything
   *
   */

    autobinder(className = {}) {
        for (let method of Object.getOwnPropertyNames(className.prototype)) {
            if (typeof this[method] === "function" && method !== "constructor") {
                this[method] = this[method].bind(this);
            }
        }
    }

    /**
     * @name autobind
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     *
     * @description auto mounts and auto binds every and all methods for the corresponding class including
     *  itself(itself mounts and self binds)
     *
     * @return does not return anything
     *
     */

    autobind(className = {}) {
        this.autobinder = this.autobinder.bind(this);
        this.autobinder(className);
    }

    /**
     * @name methodizer
     * @function
     *
     * @param {Object|Array} classNameList the class whose methods to be bound to it
     *
     * @description get methods from all classes with in-class name list array and makes its own
     *
     * @return does not return anything
     *
     */

    methodizer(...classNamesList) {
        if (classNamesList.length === 0) return;
        for (let className of classNamesList) {
            for (let method of Object.getOwnPropertyNames(className.prototype)) {
                if (this[method] === undefined || !this[method]) {
                    if (typeof className.prototype[method] === "function") {
                        this[method] = className.prototype[method];
                        // auto bind each method form className class to this
                        this[method] = this[method].bind(this);
                    }
                }
            }
        }
    }


    /**
 * @name methodizeProperty
 * @function
 *
 * @param {Object|Array} classNameList the class whose methods to be bound to it
 *
 * @description get methods from all classes with in-class name list array and makes its own
 *
 * @return does not return anything
 *
 */

    methodizeProperty(...objectWithMethodList) {
        if (objectWithMethodList.length === 0) return;
        objectWithMethodList.forEach(objectWithMethod => {
            Object.keys(objectWithMethod).forEach(method => {
                if (!this[method] || this[method] == undefined) {
                    this[method] = objectWithMethod[method];
                    if (typeof (this[method]) === 'function') {
                        this[method] = this[method].bind(this)
                    }
                }
            })
        })
    }

    /**
   * @name methodizePrototype
   * @function
   *
   * @param {Object|Array} classNameList the class whose methods to be bound to it
   *
   * @description get methods from all classes with in-class name list array and makes its own
   *
   * @return does not return anything
   *
   */

    methodizePrototype(...classNamesList) {
        if (classNamesList.length === 0) return;
        for (let className of classNamesList) {
            for (let method of Object.getOwnPropertyNames(className)) {
                if (this[method] === undefined || !this[method]) {
                    if (typeof className[method] === "function") {
                        this[method] = className[method]
                        if (typeof (this[method]) === 'function') {
                            this[method] = this[method].bind(this)
                        }
                    }
                }
            }
        }
    }

    config() {
        if (!this.db) this.db = process.env.DB_NAME
        if (!this.connection) this.connection = process.env.DB_CONNECTION
        if (this.connection && this.url && this.db) this.url = `${this.connection}/${this.db}`
        if (!this.url) this.url = process.env.DB_URL
        if (!this.collection) this.collection = 'users';
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





