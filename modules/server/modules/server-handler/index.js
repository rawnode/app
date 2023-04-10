'use strict'

/** 
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev
 * 
 * 
 * @module ServerHandler
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc ServerHandler class
 */

require('../../../settings');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// const debug = debuglog('server')
const Response = require('./modules/response')

const ContentType = require('./modules/content-type');

class ServerHandler extends require('./modules/base') {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
               Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(ServerHandler);
        // auto invoke methods
        this.autoinvoker(ServerHandler);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }


    /**
     * @name parseJSON
     * @function
     *
     * @param {String} string the string to parse
     *  
     * @description JSON parses a string
     * @return {Object} the JSON.parsed object
     * 
     */
    parseJSON(string) {
        try {
            return JSON.parse(string)
        } catch (error) {
            return {}
        }
    }

    _httpMethodList() {
        return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    }

    next( fn = () => {}) { fn()}


    /**
     * @name serverRequestHandler
     * @function
     * 
     * @param {Request}  request the request object
     * @param {Response} response the response object
     * 
     * @description sets, configures, processes, and handles all and every server requests and responses
     * @return does not return anything
     * 
     */

    handle(request, response) {

        // get the url and parse it
        const parseURL = url.parse(request.url, true)
            // get the path from the url
        const path = parseURL.pathname
            // trim the path
        const trimmedPath = path.replace(/^\/+|\/+$/g, '')
            // query string variable
        const params = parseURL.query
            // decode string
        const decoder = new StringDecoder('utf-8')
        var buffer = ``
        request
            .on('error', error => { console.log('request error', error) })
            .on('data', data => { buffer += decoder.write(data) })
            .on('end', () => {

                new ContentType({ request, response }).contentTypes()

                buffer += decoder.end()
                request.body = this.parseJSON(buffer)
                request.query = params
                request.paths = trimmedPath
                request.params = {}

                response.status = status => new Response({ status, response })
                let res = new Response({ request, response })
                response.send = res.parser


                for (let method of this._httpMethodList()) {
                    if (request.method === method) {
                        this.emit(method, trimmedPath, request, response)
                    }
                }
            })
    }

}

module.exports = ServerHandler