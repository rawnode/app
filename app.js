'use strict'

/** 
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev
 * 
 * @module App
 * @kind class
 * 
 * @extends Server
 * @requires Server
 * 
 * @classdesc App class
 */


const Router = require('./routes');

class App extends require('./modules/server') {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(App);
        // auto invoke methods
        this.autoinvoker(App);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
         // Mount Router to app

         Router({ app: this })

      }


    split(string = '', delimiters = '') {
        return typeof(string) === 'string' && string.trim().length > 0 ? string.split(delimiters).filter(str => str !== '').map(str => str.trim()) : []
    }

    // Route Parametrization:  The heart of route parameters
    routeParameters(trimmedPath, request, response, path, fn) {

        /// no repeating
        let router = {}
        if (path === trimmedPath) {
            return router[trimmedPath] = fn(request, response)
        } else {

            let paths = this.split(path, '/')
            let trimepaths = this.split(trimmedPath, '/')

            for (let ph of paths) {
                if (ph.includes(':') === true) {
                    let value = trimepaths[paths.indexOf(ph)]
                    paths[paths.indexOf(ph)] = value
                }
            }
            if (JSON.stringify(paths) === JSON.stringify(trimepaths)) {
                let keysArray = path.split('/')
                for (let key of keysArray) {
                    if (key.includes(':')) {
                        if (isNaN(paths[keysArray.indexOf(key)]) === false) {
                            request.params[key.substring(1)] = parseInt(paths[keysArray.indexOf(key)])
                        } else {
                            request.params[key.substring(1)] = paths[keysArray.indexOf(key)]
                        }
                    }
                }
                return router[trimmedPath] = fn(request, response)
            }
        }
    }

    // HTTP Methods Routing : GET Method
    get(path, fn = () => {}) {
        if (!path || path.trim().length === 0) return
        this.on('GET', (trimmedPath, request, response) => {
            return this.routeParameters(trimmedPath, request, response, path, fn)
        })
    }
     // HTTP Methods Routing : POST Method
    post(path, fn = () => {}) {
        if (!path || path.trim().length === 0) return
        this.on('POST', (trimmedPath, request, response) => {
            return this.routeParameters(trimmedPath, request, response, path, fn)
        })
    }
     // HTTP Methods Routing : PUT Method
    put(path, fn = () => {}) {
        if (!path || path.trim().length === 0) return
        this.on('PUT', (trimmedPath, request, response) => {
            return this.routeParameters(trimmedPath, request, response, path, fn)
        })
    }
     // HTTP Methods Routing : DELETE Method
    delete(path, fn = () => {}) {
        if (!path || path.trim().length === 0) return
        this.on('DELETE', (trimmedPath, request, response) => {
            return this.routeParameters(trimmedPath, request, response, path, fn)
        })
    }
     // HTTP Methods Routing : PATCH Method
    patch(path, fn = () => {}) {
        if (!path || path.trim().length === 0) return
        this.on('PATCH', (trimmedPath, request, response) => {
            return this.routeParameters(trimmedPath, request, response, path, fn)
        })
    }
    use(object = {}) {
        if (typeof object !== 'object') return
        Object.keys(object).forEach(key => {
            if (this.hasOwnProperty(key) === false) {
                this[key] = object[key]
            }
        })
    }
    autobindMethodExclude(request, ...classNamesList) {

        if (classNamesList.length === 0) return
        if (typeof request !== 'object') return

        let list = ['constructor', 'requestMethodList', 'autobindRequestMethods',
            'autobinder', 'autobind', 'methodizer', 'autoinvoker', 'autoinvoked',
            '_transform', '_flush', '_final'
        ]
        classNamesList.forEach(className => {
            for (let method of Object.getOwnPropertyNames(className.prototype)) {
                if (request[method] === undefined || !className.prototype[method]) {
                    if (typeof className.prototype[method] === 'function') {
                        if (list.includes(method) === false) {
                            request[method] = className.prototype[method]
                        }
                    }
                }
            }
        })
    }

    autobindMethodInclude(request, ...classNamesList) {

        if (classNamesList.length === 0) return
        if (typeof request !== 'object') return

        let list = ['constructor', 'requestMethodList', 'autobindRequestMethods',
            'autobinder', 'autobind', 'methodizer', 'autoinvoker', 'autoinvoked',
            '_transform', '_flush', '_final'
        ]

        classNamesList.forEach(className => {
            for (let method of Object.getOwnPropertyNames(className.prototype)) {
                if (request[method] === undefined || !className.prototype[method]) {
                    if (typeof className.prototype[method] === 'function') {
                        if (list.includes(method) === true) {
                            request[method] = className.prototype[method]
                        }
                    }
                }
            }
        })
    }

}
//  Exports a new App (Singleton)
module.exports = () => new App