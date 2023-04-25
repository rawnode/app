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
 * @module Model
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Model class
 */

const Query = require('./src/Query')

const dotenv = require('../dotenv');
dotenv.config()
class Model extends require("../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Model);
    // auto invoke methods
    this.autoinvoker(Model);
    // add other classes method if methods do not already exist. Argument order matters!
    this.methodizer(Query);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
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
              if(!this[method] || this[method] == undefined ) {
                this[method] = objectWithMethod[method];
                if(typeof(this[method]) === 'function'){
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
                    if(typeof(this[method]) === 'function'){
                      this[method] = this[method].bind(this)
                    }
                  }
                }
              }
            }
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
      return [];
    }

}

module.exports =  Model;

// // const User = new Query({db: 'mongodb://localhost:27017/city', collection: 'cities'});
const City = new Query({collection: 'cities'});

// // User.create({name: 'Andrew', email: 'andre@gmail.com', password: 'password',lastname: 'DeMaison'})
City.findById().then(console.log)

// console.log(City)



