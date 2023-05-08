"use strict";

/**
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev
 *
 * @module Observable
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires get
 * @requires request
 * @requires parse
 * @classdesc Observable class
 */

const https = require('https');
const http = require('http');
const { parse } = require('url')

const { createWriteStream, createReadStream } = require('fs')

const { Readable, Writable } = require('stream')

class Observable extends require("stream").Transform {
   constructor(...arrayOfObjects) {
      super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
      arrayOfObjects.forEach(option => {
         if (Object.keys(option).length > 0) {
            Object.keys(option).forEach((key) => {
               if (!this[key]) this[key] = option[key];
            })
         }
      });
      // auto bind methods
      //  this.autobind(Observable);
      // auto invoke methods
      this.autoinvoker(Observable);
      // add other classes method if methods do not already exist. Argument order matters!
      // this.methodizer(..classList);
      //Set the maximum number of listeners to infinity
      this.setMaxListeners(Infinity);
   }

   path(path = '', base = process.cwd()) {
      return require('path').join(base, path)
   }

   writable(path = this.path('.'), encoding = "utf-8") {
      return createWriteStream(path, encoding, true)
   }
   readable(path = this.path('.'), encoding = "utf-8",) {
      return createReadStream(path, encoding, true)
   }

   /**
      * @name getFromIterable
      * @function
      *
      * @param {Object|Array} iterable iterable data to absorb
      * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
      * 
      * @description creates readable streams out of iterators.
 
 
      * 
      * @return {Observable}
      * 
      */

   getFromIterable(
      iterable = {} | [],
      options = { objectMode: true, encoding: "utf-8", autoDestroy: true }
   ) {
      return Observable.from(JSON.stringify(iterable), options);
   }

   /**
   * @name buffer
   * @function
   *
   * @param {Object} data the data to JSON parse
   *
   * @description JSON parses the buffered data
   *
   * @return JSON parsed buffered data;
   *
   */
   buffer(data) {
      return JSON.parse(Buffer(data));
   }


   /**
   * @name bufferToString
   * @function
   *
   * @param {Object} data the data to stringify
   *
   * @description Stringifies buffered json parsed data;
   *
   * @return stringified json parsed buffered data
   *
   */
   bufferToString(data) {
      return JSON.parse(Buffer(data).toString());
   }

   /**
   * @name apiGet
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Object} options the https request option object
   * @param {Function} fn the callback function 
   * @param {Array} data the resulting object of the https request call;
   *
   * @description makes an https get request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */
   apiGet(url, options = {}, fn = () => { }, data = []) {
      https.get(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('apiGet-error', error);
         });
         response.on('end', () => {
            this.emit('apiGet', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
      return this;
   }

   /**
  * @name get
  * @function
  *
  * @param {String} url the https request api endpoint url
  * @param {Object} options the https request option object
  * @param {Function} fn the callback function 
  * @param {Array} data the resulting object of the https request call;
  *
  * @description makes an https get request to an api endpoint
  *
  * @return stringified json parsed buffered data
  *
  */
   get(url, options = {}, fn = () => { }, data = []) {
      https.get(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('get-error', error);
         });
         response.on('end', () => {
            this.emit('get', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
      return this;
   }

   options(url, method = 'POST', port = 443, headers = {
      'Content-Type': 'application/json'
   }) {
      const options = parse(url);
      options.port = port;
      options.method = method;
      options.headers = headers;
      return options
   }

   /**
   * @name apiRequest
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Object} options the https request option object
   * @param {Function} fn the callback function 
   * @param {Array} data the resulting object of the https request call;
   *
   * @description makes an https request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */
   apiRequest(url, options, fn = () => { }, data = []) {
      https.request(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('apiRequest-error', error.message);
            fn(error.message, error)
         });
         response.on('end', () => {
            this.emit('apiRequest', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
   }


   /**
  * @name post
  * @function
  *
  * @param {String} url the https request api endpoint url
  * @param {Array} data the resulting object of the https request call;
  * @param {Object} headers the https request option object
  * @param {Function} fn the callback function 
  * @param {String} datum the resulting object of the https request call;
 
  *
  * @description makes an https post request to an api endpoint
  *
  * @return stringified json parsed buffered data
  *
  */
   post(url = parse(url), data = JSON.stringify(data), headers = {
      'Content-Type': 'application/json'
   }, fn = () => { }, datum = ``) {

      const options = parse(url);
      options.port = 443;
      options.method = 'POST';
      options.headers = headers;

      const req = https.request(options, response => {
         response.on('data', chunk => {
            datum += chunk;
         })
         response.on('end', () => {
            this.emit('post', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
         })
         response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
         })
      })
      req.write(datum);
      req.end();
   }


   /**
  * @name put
  * @function
  *
  * @param {String} url the https request api endpoint url
  * @param {Array} data the resulting object of the https request call;
  * @param {Object} headers the https request option object
  * @param {Function} fn the callback function 
  * @param {String} datum the resulting object of the https request call;
 
  *
  * @description makes an https post request to an api endpoint
  *
  * @return stringified json parsed buffered data
  *
  */
   put(url = parse(url), data = JSON.stringify(data), headers = {
      'Content-Type': 'application/json'
   }, fn = () => { }, datum = ``) {

      const options = parse(url);
      options.port = 443;
      options.method = 'PUT';
      options.headers = headers;

      const req = https.request(options, response => {
         response.on('data', chunk => {
            datum += chunk;
         })
         response.on('end', () => {
            this.emit('put', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
         })
         response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
         })
      })
      req.write(datum);
      req.end();
   }


   /**
* @name delete
* @function
*
* @param {String} url the https request api endpoint url
* @param {Array} data the resulting object of the https request call;
* @param {Object} headers the https request option object
* @param {Function} fn the callback function 
* @param {String} datum the resulting object of the https request call;
 
*
* @description makes an https post request to an api endpoint
*
* @return stringified json parsed buffered data
*
*/
   delete(url = parse(url), headers = {
      'Content-Type': 'application/json'
   }, fn = () => { }, datum = ``) {

      const options = parse(url);
      options.port = 443;
      options.method = 'DELETE';
      options.headers = headers;

      const req = https.request(options, response => {
         response.on('data', chunk => {
            datum += chunk;
         })
         response.on('end', () => {
            this.emit('delete', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
         })
         response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
         })
      })
      req.write(datum);
      req.end();
   }


   // http 


   /**
* @name apiGET
* @function
*
* @param {String} url the https request api endpoint url
* @param {Object} options the https request option object
* @param {Function} fn the callback function 
* @param {Array} data the resulting object of the https request call;
*
* @description makes an https get request to an api endpoint
*
* @return stringified json parsed buffered data
*
*/
   apiGET(url, options = {}, fn = () => { }, data = []) {
      http.get(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('apiGET-error', error);
         });
         response.on('end', () => {
            this.emit('apiGET', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
      return this;
   }

   /**
  * @name GET
  * @function
  *
  * @param {String} url the https request api endpoint url
  * @param {Object} options the https request option object
  * @param {Function} fn the callback function 
  * @param {Array} data the resulting object of the https request call;
  *
  * @description makes an https get request to an api endpoint
  *
  * @return stringified json parsed buffered data
  *
  */
   GET(url, port = 80, fn = () => { }, data = []) {

      const options = parse(url);
      options.port = 3000 || port;
      options.method = 'GET';

      http.get(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('GET-error', error);
         });
         response.on('end', () => {
            this.emit('GET', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
      return this;
   }

   options(url, method = 'POST', port = 443, headers = {
      'Content-Type': 'application/json'
   }) {
      const options = parse(url);
      options.port = port;
      options.method = method;
      options.headers = headers;
      return options
   }

   /**
   * @name apiRequest
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Object} options the https request option object
   * @param {Function} fn the callback function 
   * @param {Array} data the resulting object of the https request call;
   *
   * @description makes an https request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */
   apiREQUEST(url, options, fn = () => { }, data = []) {
      http.request(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('apiREQUEST-error', error.message);
            fn(error.message, error)
         });
         response.on('end', () => {
            this.emit('apiREQUEST', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
   }


   /**
  * @name POST
  * @function
  *
  * @param {String} url the https request api endpoint url
  * @param {Array} data the resulting object of the https request call;
  * @param {Object} headers the https request option object
  * @param {Function} fn the callback function 
  * @param {String} datum the resulting object of the https request call;
 
  *
  * @description makes an https post request to an api endpoint
  *
  * @return stringified json parsed buffered data
  *
  */
   POST(url = parse(url), data = JSON.stringify(data), port = 80, headers = {
      'Content-Type': 'application/json'
   }, fn = () => { }, datum = ``) {

      const options = parse(url);
      options.port = 3000 || port;
      options.method = 'POST';
      options.headers = headers;

      const req = http.request(options, response => {
         response.on('data', chunk => {
            datum += chunk;
         })
         response.on('end', () => {
            this.emit('POST', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
         })
         response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
         })
      })
      req.write(datum);
      req.end();
   }


   /**
  * @name PUT
  * @function
  *
  * @param {String} url the https request api endpoint url
  * @param {Array} data the resulting object of the https request call;
  * @param {Object} headers the https request option object
  * @param {Function} fn the callback function 
  * @param {String} datum the resulting object of the https request call;
 
  *
  * @description makes an https post request to an api endpoint
  *
  * @return stringified json parsed buffered data
  *
  */
   PUT(url = parse(url), data = JSON.stringify(data), port = 80, headers = {
      'Content-Type': 'application/json'
   }, fn = () => { }, datum = ``) {

      const options = parse(url);
      options.port = 3000 || port;
      options.method = 'PUT';
      options.headers = headers;

      const req = http.request(options, response => {
         response.on('data', chunk => {
            datum += chunk;
         })
         response.on('end', () => {
            this.emit('PUT', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
         })
         response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
         })
      })
      req.write(datum);
      req.end();
   }


   /**
* @name DELETE
* @function
*
* @param {String} url the https request api endpoint url
* @param {Array} data the resulting object of the https request call;
* @param {Object} headers the https request option object
* @param {Function} fn the callback function 
* @param {String} datum the resulting object of the https request call;

*
* @description makes an https post request to an api endpoint
*
* @return stringified json parsed buffered data
*
*/
   DELETE(url = parse(url), port = 80, headers = {
      'Content-Type': 'application/json'
   }, fn = () => { }, datum = ``) {

      const options = parse(url);
      options.port = 3000 || port;
      options.method = 'DELETE';
      options.headers = headers;

      const req = http.request(options, response => {
         response.on('data', chunk => {
            datum += chunk;
         })
         response.on('end', () => {
            this.emit('DELETE', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
         })
         response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
         })
      })
      req.write(datum);
      req.end();
   }

   async Get(url = `https://jsonplaceholder.typicode.com/comments`, fn = () => { }) {
      try {
         const response = await fetch(url);
         const data = await response.json();
         fn(null, data, response)
         this.emit('Get', data);
         return { data, error: null };
      } catch (error) {
         this.emit('Get-error', error);
         fn(error, null, null)
         return { error, data: null }
      }
   }
   async Post(url = `https://jsonplaceholder.typicode.com/comments`, data = {}, fn = () => { }) {

      try {
         const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         });
         const responseData = await response.json();
         fn(null, responseData, response)
         this.emit('Post', responseData);
         return { data: responseData, error: null };
      } catch (error) {
         this.emit('Post-error', error);
         fn(error, null, null)
         return { error, data: null }
      }
   }
   async Put(url = `https://jsonplaceholder.typicode.com/comments/1`, data = {}, fn = () => { }) {

      try {
         const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         });
         const responseData = await response.json();
         fn(null, responseData, response)
         this.emit('Post', responseData);
         return { data: responseData, error: null };
      } catch (error) {
         this.emit('Post-error', error);
         fn(error, null, null)
         return { error, data: null }
      }
   }
   async Delete(url = `https://jsonplaceholder.typicode.com/comments/1`, fn = () => { }) {
      try {
         const response = await fetch(url, { method: 'DELETE' });

         fn(null, response.status, response)
         this.emit('Post', response.status);
         return { status: response.status, error: null };

      } catch (error) {
         this.emit('Post-error', error);
         fn(error, null, null)
         return { error, status: null }
      }
   }

   pGet(url = `https://jsonplaceholder.typicode.com/comments`) {
      new Promise((resolve, reject) => {
         fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
      })
         .then(data => console.log(data))
         .catch(error => console.error(error));
   }
   pPost(url = `https://jsonplaceholder.typicode.com/comments`, data) {

      new Promise((resolve, reject) => {
         fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
      })
         .then(data => console.log(data))
         .catch(error => console.error(error));
   }
   pPut(url = `https://jsonplaceholder.typicode.com/comments/1`, data) {

      new Promise((resolve, reject) => {
         fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
      })
         .then(data => console.log(data))
         .catch(error => console.error(error));

   }
   pDelete(url = `https://jsonplaceholder.typicode.com/comments/1`) {
      new Promise((resolve, reject) => {
         fetch(url, { method: 'DELETE' })
            .then(response => resolve(response.status))
            .catch(error => reject(error));
      })
         .then(status => console.log(status))
         .catch(error => console.error(error));

   }

   removeDuplicateListeners(event) {
      if (this.rawListeners(event).length > 1) {
         for (let i = 1; i < this.rawListeners(event).length; i++) {
            this.removeListener(event, this.rawListeners(event)[i]);
         }
      }
   }

   /**
    * @name autoinvoker
    * @function
    *
    * @param {Object|Function|Class} className the class whose methods to be bound to it
    *
    * @description auto sets and auto invokes every and all methods for the corresponding class
    *
    * @return does not return anything
    *
    */

   autoinvoker(className = {}) {
      for (let method of Object.getOwnPropertyNames(className.prototype)) {
         this.autoinvoked().forEach((name) => {
            if (method === name) {
               this[method]();
            }
         });
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
      return [""];
   }


   /**
    * @name _transform
    * @function
    *
    * @param {Buffer|String|Any} chunk The Buffer to be transformed, converted from the string passed to stream. write(). * If the stream's decode strings option is false or the stream is operating in object mode,
    * the chunk will not be converted & will be whatever was passed to stream. write().
    *
    * @param {String} encoding If the chunk is a string, then this is the encoding type.
    * If the chunk is a buffer, then this is the special value 'buffer'. Ignore it in that case.
    * @param {Function} fn A callback function (optionally with an error argument and data)
    *  to be called after the supplied chunk has been processed.
    *
    * @description This function MUST NOT be called by application code directly.
    *  It should be implemented by child classes and called by the internal Readable class methods only.
    *
    * @return does not return anything
    *
    */

   _transform(chunk, encoding = "utf-8", fn) {
      this.push(JSON.stringify(chunk));
      fn();
   }

   /**
    * @name _flush
    * @function
    *
    * @param {Function} fn A callback function (optionally with an error argument and data)
    *  to be called after the supplied chunk has been processed.
    *
    * @description This function MUST NOT be called by application code directly.
    *  It should be implemented by child classes and called by the internal Readable class methods only.
    *
    * @return does not return anything
    *
    */

   _flush(fn) {
      fn();
   }

   /**
    * @name _final
    * @function
    *
    * @param {Function} fn A callback function (optionally with an error argument and data)
    *  to be called after the supplied chunk has been processed.
    *
    * @description This function MUST NOT be called by application code directly.
    *  It should be implemented by child classes and called by the internal Readable class methods only.
    *
    * @return does not return anything
    *
    */

   _final(fn) {
      fn();
   }


   /**
        * @name _read
        * @function
        * 
        * @param {Number} size Number of bytes to read asynchronously
        * 
   
    
        * @description This function MUST NOT be called by application code directly. It should be implemented by child classes and called by the internal Readable class methods only.
        * 
        *All Readable stream implementations must provide an implementation of the readable._read() method to fetch data from the underlying resource.
   
       When readable._read() is called, if data is available from the resource, the implementation should begin pushing that data into the read queue using the this.push(data chunk) method. _read() should continue reading from the resource and pushing data until readable.push() returns false. Only when _read() is called again after it has stopped should it resume pushing additional data onto the queue.
       
       Once the readable._read() method has been called, it will not be called again until more data is pushed through the readable.push() method. Empty data such as empty buffers and strings will not cause readable._read() to be called.
   
       The size argument is advisory. For implementations where a "read" is a single operation, returns data can use the size argument to determine how much data to fetch. Other implementations may ignore this argument and simply provide data whenever it becomes available. There is no need to "wait" until size bytes are available before calling stream.push(chunk).
   
       The readable._read() method is prefixed with an underscore because it is internal to the class that defines it, and should never be called directly by user programs.
   
   
       
        * @return does not return anything
        * 
        */

   _read(size) { }


   /**
       * @name _destroy
       * @function
       * 
       * @param {Error} error A possible error..
       * 
  
       * @param {Function} fn  A callback function that takes an optional error  argument.
       * 
       *  to be called after the supplied chunk has been processed.
       * 
       * @description The _destroy() method is called by writable.destroy(). It can be overridden by child classes but it must not be called directly.
       *    
       * @return does not return anything
       * 
       */
   _destroy(error, fn = () => { }) { }
}

module.exports = Observable;











