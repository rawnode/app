"use strict";

/**
/**
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev
 * 
 * @module Mongosh
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Mongosh class
 */




require('dotenv').config();

const QueryString = require('./src/QueryString')

class Mongosh extends require("./base") {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

        arrayOfObjects.forEach(option => {
            if (Object.keys(option).length > 0) {
                Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
            }
        });

        // auto bind methods
        this.autobind(Mongosh);
        // auto invoke methods
        this.autoinvoker(Mongosh);
        // add other classes method if methods do not already exist. Argument order matters!
        this.methodizer(QueryString);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
    }

    queryError () {
        this.emit("find-error", { error: "input query must be an object" });
        this.emit("find-error", { error: "input query must be an object" });
        return { error: "input query must be an object" };
    }

    isValidObjectId(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
      }
      
    idError () {
        if(!this.isValidObjectId(id)) return `Id must be a string of 12 bytes or a string of 24 hex characters or an integer!`;
        this.emit("findById-error", { error: "input query must be an object" });
        this.emit("findById-error", { error: "input query must be an object" });
        return { error: "input id must be an string" };
    }
    codeError () {
        this.emit("findById-error", { error: "input query must be an object" });
        this.emit("findById-error", { error: "input query must be an object" });
        return { error: "input id must be an string" };
    }
    emailError () {
        this.emit("findById-error", { error: "input query must be an object" });
        this.emit("findById-error", { error: "input query must be an object" });
        return { error: "input id must be an string" };
    }
    projectionError(){
        this.emit("find-error", {
            error: "projection query must be an object",
        });
        this.emit("find-error", {
            error: "projection query must be an object",
        });
        return { error: "projection query must be an object" };
    }

    find(query = {}, projection = {}, collection = this.collection, url = this.url) {

        if (query && typeof query !== "object") return this.queryError();
        if (projection && typeof projection !== "object") return this.projectionError();
        return this.findQueryString(query, projection, collection, url)
    }
   
    findOne(query = {}, projection = {}, collection = this.collection, url = this.url) {
        if (query && typeof query !== "object") return this.queryError();
        if (projection && typeof projection !== "object") return this.projectionError();
        return this.findOneQueryString(query, projection, collection, url)
    }

    findOneLatest(query = {}, projection = {}, collection = this.collection, url = this.url) {
        if (query && typeof query !== "object") return this.queryError();
        if (projection && typeof projection !== "object") return this.projectionError();
        return this.findOneLatestQueryString(query, projection, collection, url)
    }

    findLatestOne(query = {}, projection = {}, collection = this.collection, url = this.url) {
        if (query && typeof query !== "object") return this.queryError();
        if (projection && typeof projection !== "object") return this.projectionError();
        return this.findLatestOneQueryString(query, projection, collection, url)
    }
    findById(id = '', collection = this.collection, url = this.url) {
        if (id && typeof id !== "string") return this.idError();
        return this.findByIdQueryString(id, collection, url)
    }

    findByCode(code = '', collection = this.collection, url = this.url) {
        if (code && typeof code !== "string") return this.codeError();
        return this.findByCodeQueryString(code, collection, url)
    }

    findByEmail(email = '', collection = this.collection, url = this.url) {
        if (email && typeof email !== "string") return this.emailError();
        return this.findByEmailQueryString(email, collection, url)
    }
    /**
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

module.exports = Mongosh;

// const mongosh = new Mongosh({collection: 'cities'});

// console.log(mongosh)





