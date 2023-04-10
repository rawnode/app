'use strict'

/** 
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev

 * 
 * @module Config
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Config class
 */


class Config extends require('./modules/base') {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
               Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(Config);
        // auto invoke methods
        this.autoinvoker(Config);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }

    /**
     * @name staging
     * @function
     *
     * @description sets and configures the server staging configuration
     * @return {Object} the server staging configuration object
     * 
     */

    staging() {
            return {
                httpPort: 3000,
                httpsPort: 3001,
                protocal: 'http:',
                hostname: 'localhost',
                url: 'http://localhost:3000',
                name: 'staging',
                hashingSecret: 'HolyMole!IsThisTheHashingSecret?',
                maxChecks: 5,
                maxItemsInCart: 200,
                globalViews: {
                    name: 'Zero Dependency! No npm! No package.json!',
                    company: 'Raw Node',
                    year: '2020',
                    baseUrl: `http://127.0.0.1:3000/`
                }
            }
        }
        /**
         * @name production
         * @function
         *
         * @description sets and configures the server production configuration
         * @return {Object} the server production configuration object
         * 
         */

    production() {
            return {
                httpPort: 5000,
                httpsPort: 5001,
                protocal: 'http:',
                hostname: 'localhost',
                url: 'http://localhost:3000',
                name: 'production',
                hashingSecret: 'HolyMole!IsThisTheHashingSecret?',
                maxChecks: 5,
                maxItemsInCart: 200,

                globalViews: {
                    name: 'Wonderful Pizza',
                    company: 'Wonderful Pizza, Inc.',
                    year: '2020',
                    baseUrl: `http://localhost:3000/`
                }
            }
        }
        /**
         * @name development
         * @function
         *
         * @description sets and configures the server development configuration
         * @return {Object} the server development configuration object
         * 
         */

    development() {
            return {
                port: 8000,
                httpPort: 8000,
                httpsPort: 8080,
                name: 'development',
                hashingSecret: 'HolyMole!IsThisTheHashingSecret?',
                maxChecks: 5,
                protocal: 'http:',
                hostname: 'localhost',
                url: 'http://localhost:3000',
                hashingSecret: 'HolyMole!IsThisTheHashingSecret?',
                maxChecks: 5,
                maxItemsInCart: 200,

                globalViews: {
                    name: 'Wonderful Pizza',
                    company: 'Wonderful Pizza, Inc.',
                    year: '2020',
                    baseUrl: `http://localhost:3000/`
                }
            };

        }
        /**
         * @name currentEnvironment
         * @function
         *
         * @description checks and sets the currentEnvironment variables
         * @return {String}  NODE_ENV variable
         * 
         */

    currentEnvironment() {
            return typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
        }
        /**
         * @name environmentToExport
         * @function
         *
         * @description export the current environment
         * @return {String}  NODE_ENV variable
         * 
         */

    environmentToExport() {
        // return this.currentEnvironment() === 'object' ? this.currentEnvironment() : this.staging()
        return this.development()
    }

    /**
     * @name state
     * @function
     *
     * @description sets the environment to exports
     * @return {Function}  this.environmentToExport()
     * 
     */

    static state() {
        // return this.environmentToExport()
        return this.development()
    }




}

module.exports = Config