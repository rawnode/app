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
 * @module Executer
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Executer class
 */



require('../../dotenv').config();

const { createWriteStream, existsSync, unlink } = require('fs')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const Query = require('./Query')

class Executer extends require("../../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(Executer);
    // auto invoke methods
    this.autoinvoker(Executer);
    // add other classes method if methods do not already exist. Argument order matters!
    this.methodizer(Query);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  path(path = '', base = process.cwd()) {
    return require('path').join(base, path)
  }

  cleaner(string) { return Array.from(string).filter(el => (el.trim().length !== 0 && el.trim() !== `"` && el.trim() !== `'`)).join(''); }

  async execAll(collection = this.collection, db = this.db, connection = this.connction, path = this.path('/databases/all.js')){

    // if (existsSync(path)) path = `${path.split('.js')[0]}-${Date.now()}.js`;

    await this.getAllQuery(collection, db, connection, path)

    const { stdout, stderr } = await exec(`mongosh --file  ${path}`);

    if(stderr) throw new TypeError('Query execution failed');

    const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;

    const str = stdout.match(regex)[0];
    const matches = str.match(/{(.*?)}/gs);

  

    const results =  matches ? matches.map(match => match.slice(1, -1)) : null;

    //return console.log(results)
    return results;

  }


  async execFindByIdQuery ( id = '',collection = this.collection, db = this.db, connection = this.connection, filePath = './databases/findById.js') {

    await this.findByIdQuery(id, collection, db, connection, filePath)

    const { stdout, stderr } = await exec(`mongosh --file  ${filePath}`);

    if(stderr) throw new TypeError('Query execution failed');
    const regex = /^\s*{\s*[\n\r]+(?:\s*[^\n\r]+[\n\r]+)+\s*}\s*$/gm;

    // return console.log(stdout)
    let str = stdout.match(regex)[0];

    // return console.log(str)
 
    // let strs =  Array.from(this.cleaner(str));

    let strs =  Array.from(str);
    strs.pop();
    strs.shift();

    // return console.log(strs.join(''))
 
    return strs.join('').trim().split(',');//this.cleaner(strs).split(',');
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

module.exports = Executer;





