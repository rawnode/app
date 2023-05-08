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
 * @module Builder
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Builder class
 */


require('../../dotenv').config();

class Builder extends require("../../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(Builder);
    // auto invoke methods
    this.autoinvoker(Builder);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(Query);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  path(path = '', base = process.cwd()) {
    return require('path').join(base, path)
  }

  cleaner(string) { return Array.from(string).filter(el => (el.trim().length !== 0 && el.trim() !== `"` && el.trim() !== `'`)).join(''); }
  valueCleaner(string) { 
    let elArray = Array.from(string.trim())
    elArray.pop();
    elArray.shift();
    return elArray.join('')
   }

//   ObjectId() {
//     const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
//     const random = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
//     const counter = (this.ObjectId.counter++ % 16777216).toString(16).padStart(6, '0');
//     return timestamp + random + counter;
// }
ObjectId(string = 'string'){}
  buildAll(results, data = []) {
   
    for (let datum of results) {

      let single = {}
      for (let el of datum.split(',')) {
        let index = el.indexOf(':');
        let key = el.substring(0, index).trim();
        let value = el.substring(index + 1).trim();

        single[key] = this.cleaner(value);
        if (Number.isInteger(parseInt(this.cleaner(el.substring(index + 1).trim())))) {
          single[key] = Number(parseInt(this.cleaner(el.substring(index + 1).trim())));
        } else {
 
          if(el.substring(index + 1).trim().startsWith('ObjectId(') || el.substring(index + 1).trim().startsWith('ISODate(')){
            single[key] = el.substring(index + 1).trim();
          }else{
            single[key] = this.valueCleaner(el.substring(index + 1).trim());
          }
          // return console.log()
          // single[key] = this.valueCleaner(el.substring(index + 1).trim());// this.valueCleaner(el.substring(index + 1).trim()).toString()
        }
      }
      data.push(single)
    }

    return data;
  }

  buildFindById(results, data = {}) {
    for (let datum of results) {
      for (let el of datum.split(',')) {
        let index = el.indexOf(':');
        let key = el.substring(0, index).trim();
        let value = el.substring(index + 1).trim();
        data[key] = this.cleaner(value);
        if (Number.isInteger(parseInt(this.cleaner(el.substring(index + 1).trim())))) {
          data[key] = Number(parseInt(this.cleaner(el.substring(index + 1).trim())));
        } else {
          
          if(el.substring(index + 1).trim().startsWith('ObjectId(') || el.substring(index + 1).trim().startsWith('ISODate(')){
             if(el.substring(index + 1).trim().endsWith('\n}')){
              data[key] = el.substring(index + 1).trim().split('\n}')[0];
             }else{
              data[key] = el.substring(index + 1).trim();
             }
          }else{
            data[key] = this.valueCleaner(el.substring(index + 1).trim());
          }
        }
      }

     
    }
    return data
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

module.exports = Builder;




