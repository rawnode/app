'use strict'

/** 
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev
 *
 * 
 * @module Router
 * @kind class
 * 
 * @extends Base
 * @requires Base
 * 
 * @classdesc Router class
 */


const { createReadStream,existsSync,mkdirSync,writeFileSync } = require('fs')
class Router extends require('./modules/base') {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
          Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Router);
    // auto invoke methods
    this.autoinvoker(Router);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

    // Available default HTTP methods for mounting to Router
    methodList() {
        return ['get', 'post', 'put', 'delete', 'patch']
    }

    // Mounting HTTP Method To Router : GET Method
    get(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.get(path, fn)
    }

    // Mounting HTTP Method To Router : POST Method
    post(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.post(path, fn)
    }
    // Mounting HTTP Method To Router : PUT Method
    put(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.put(path, fn)
    }
    // Mounting HTTP Method To Router : DELETE Method
    delete(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.delete(path, fn)
    }
    // Mounting HTTP Method To Router : PATCH Method
    patch(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.patch(path, fn)
    }

    createRouteDirectoryIfDoesNotExsist(){
        if (!existsSync(process.cwd() + '/routes')) {
            mkdirSync(process.cwd() + '/routes');
            console.log('public directory created successfully!');
            // if (!existsSync(process.cwd() + '/public/favicon.ico')) {
            //     writeFileSync(process.cwd() + '/public/favicon.ico', 'This is a new file!');
            //     console.log('favicon.ico file created successfully in public directory!');
            //   } 
          } else {
            // if (!existsSync(process.cwd() + '/public/favicon.ico')) {
            //     writeFileSync(process.cwd() + '/public/favicon.ico', 'This is a new file!');
            //     console.log('favicon.ico file created successfully in public directory!');
            // } 
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
        return ["createRouteDirectoryIfDoesNotExsist"];
      }
    

}

module.exports = Router