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
const { exec } = require('child_process');

const fs = require('fs')

// const QueryWriter = require('./src/QueryWriter')
const findQueryWriter = require('./src/db/queryWriters/findQueryWriter');
const findOneQueryWriter = require('./src/db/queryWriters/findOneQueryWriter');
const findByIdQueryWriter = require('./src/db/queryWriters/findByIdQueryWriter');
const findByCodeQueryWriter = require('./src/db/queryWriters/findByCodeQueryWriter');
const findByEmailQueryWriter = require('./src/db/queryWriters/findByEmailQueryWriter');
const findByUsernameQueryWriter = require('./src/db/queryWriters/findByUsernameQueryWriter');
const insertOneQueryWriter = require('./src/db/queryWriters/insertOneQueryWriter');
const insertManyQueryWriter = require('./src/db/queryWriters/insertManyQueryWriter');

const deleteOneQueryWriter = require('./src/db/queryWriters/deleteOneQueryWriter');
const deleteManyQueryWriter = require('./src/db/queryWriters/deleteManyQueryWriter');
const replaceOneQueryWriter = require('./src/db/queryWriters/replaceOneQueryWriter');
const updateOneQueryWriter = require('./src/db/queryWriters/updateOneQueryWriter');

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
        // this.methodizer(QueryWriter);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
    }

    path(path = '', base = process.cwd()) {
        return require('path').join(base, path)
    }

    queryError () {
        this.emit("find-error", { error: "input query must be an object" });
        this.emit("find-error", { error: "input query must be an object" });
        return { error: "input query must be an object" };
    }

    isValidObjectId(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
      }
      
    idError (id) {
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
    removeLink (path, result = [], reject = () => {}, resolve = () => {}){
        if(fs.existsSync(path)) fs.unlink(path, error => error ? reject(error) : resolve(result));
    }

    // code: 'KP'
    find(query = {}, projection = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        findQueryWriter(query, projection, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
                        this.removeLink(this.path(`/databases/${collection}.json`),result, reject, resolve)
                        this.removeLink(this.path('cities.js'),result, reject, resolve)
                        this.removeLink(this.path(`/databases/${collection}-find.js`),result, reject, resolve)
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }

    findOne(data = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        findOneQueryWriter(data, projection, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                   
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }


    findById(id = '635919e22bc9cdd44701ee8a', projection = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(!this.isValidObjectId(id)) return `Id must be a string of 12 bytes or a string of 24 hex characters or an integer!`;

        findByIdQueryWriter(id, projection, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }

    findByCode(code = '635919e22bc9cdd44701ee8a', projection = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(typeof code !== 'string') return `Code must be a string!`;

        findByCodeQueryWriter(code, projection, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }



    findByEmail(email = '635919e22bc9cdd44701ee8a', projection = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(typeof email !== 'string') return `Code must be a string!`;

        findByEmailQueryWriter(email, projection, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }



    findByUsername(username = '635919e22bc9cdd44701ee8a', projection = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(typeof username !== 'string') return `Code must be a string!`;

        findByUsernameQueryWriter(username, projection, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }



    insertOne(data  = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(typeof data !=='object') return `data must be a object!`;

        insertOneQueryWriter(data, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }

    create(data  = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(typeof data !=='object') return `data must be a object!`;

        insertOneQueryWriter(data, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }


    insertMany(data  = [], collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(Object.prototype.toString.call(data) !== '[object Array]') return `data must be an array objects!`;

        insertManyQueryWriter(data, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }


    createMany(data  = [], collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(Object.prototype.toString.call(data) !== '[object Array]') return `data must be an array objects!`;

        insertManyQueryWriter(data, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }


    deleteOne(query = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(Object.prototype.toString.call(query) !== '[object Object]') return `data must be an object!`;

        deleteOneQueryWriter(query, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }



    deleteMany(query = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(Object.prototype.toString.call(query) !== '[object Object]') return `input query must be an object!`;

        deleteManyQueryWriter(query, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }


    


    replaceOne(query = {}, data = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

        if(Object.prototype.toString.call(query) !== '[object Object]') return `input query must be an object!`;
        if(Object.prototype.toString.call(data) !== '[object Object]') return `input data must be an object!`;

        replaceOneQueryWriter(query, data, collection, path)

        return new Promise((resolve, reject) => {
            exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stdout.length > 0) {
                    let result;
                    const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
                    readable.on('data', chunk => result = JSON.parse(chunk))
                    readable.on('end', () => {
            
                        if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
                            fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
                        }
                        if(fs.existsSync(this.path('cities.js'))) {
                            fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
                            fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
                        }
                        
                    });
                    readable.on('error', error => reject(error));
                }
            });
        })
    }

    // updateOne(query = {}, data = {}, options = {}, collection = this.collection, path = this.path(`/databases/${this.collection}-find.js`)){

    //     if(Object.prototype.toString.call(query) !== '[object Object]') return `input query must be an object!`;
    //     if(Object.prototype.toString.call(data) !== '[object Object]') return `input data must be an object!`;
    //     if(Object.prototype.toString.call(options) !== '[object Object]') return `input options must be an object!`;

    //     updateOneQueryWriter(query, data, options, collection, path)

    //     return new Promise((resolve, reject) => {
    //         exec(`mongosh --file ${this.path(`/databases/${collection}-find.js`)}`, (error, stdout, stderr) => {
    //             if (error) reject(error)
    //             if (stdout.length > 0) {
    //                 let result;
    //                 const readable = fs.createReadStream(this.path(`/databases/${collection}.json`), { encoding: 'utf8', autoClose: true, autoDestroy: true })
    //                 readable.on('data', chunk => result = JSON.parse(chunk))
    //                 readable.on('end', () => {
            
    //                     if(fs.existsSync(this.path(`/databases/${collection}.json`))) {
    //                         fs.unlink(this.path(`/databases/${collection}.json`), error => error ? reject(error) : resolve(result));
    //                     }
    //                     if(fs.existsSync(this.path('cities.js'))) {
    //                         fs.unlink(this.path('cities.js'), error => error ? console.log(error.message) : console.log('Success'));
    //                     }
    //                     if(fs.existsSync(this.path(`/databases/${this.collection}-find.js`))) {
    //                         fs.unlink(this.path(`/databases/${collection}-find.js`), error => error ? console.log(error.message) : console.log('Success'));
    //                     }
                        
    //                 });
    //                 readable.on('error', error => reject(error));
    //             }
    //         });
    //     })
    // }
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





