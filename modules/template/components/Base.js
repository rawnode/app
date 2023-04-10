'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module BaseElement
 * @kind class
 * 
 * @extends HTMLElement
 * 
 * @requires HTMLElement
 * 
 * @classdesc Base class for the front end system. The main and only ancestor of all the classes of the whole front end system (the entire frontend code base)
 * 
 * 
 */
class BaseElement extends HTMLElement {
 
    constructor(...arrayOfObjects) {

        super();
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(BaseElement);
        // auto invoke methods
        this.autoinvoker(BaseElement);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
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
                  this[method] = this[method].bind(this);
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
          methodizePrototype(...objectWithMethodList){
            if (objectWithMethodList.length === 0) return;
            objectWithMethodList.forEach(objectWithMethod => {
              Object.keys(objectWithMethod).forEach(method => {
                if(!this[method] || this[method] == undefined ) {
                  this[method] = objectWithMethod[method]
                  this[method] = this[method].bind(this);
                }
              })
            })
          
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
     * @name promisify
     * @function
     *
     * @param {Function|Object} fn the function or object to be promisified
     *  
     * @description promisified functions or objects
     * @return {Function|Object} fn, the promisified function
     * 
     */
    promisify(fn){
      return (...args) => new Promise((resolve, reject) => fn(...args), (err, data) => (err ? reject(err) : resolve(data)))
  }

  
  /**
   * @name getField
   * @function
   *
   * @param {String|Object} attribute the attribute to extract
   *  
   * @description Receive the name of an attribute  and produce a new function that will be able to extract  an attribute from an object
   * 
   * @return {Function|Object} object, the function that will be able to extract an attribute from an object
   * 
   */
  getField (attribute){
      return object => object[attribute]
  }

  /**
   * @name pluckOff
   * @function
   *
   * @param {Function|Object} fn  the function to bind to object method
   *  
   * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
   * 
   *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
   * 
   * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
   * 
   * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
   * 
   */

  pluckOff(fn){
      return (...args) => fn.bind(...args)()
  }

   /**
   * @name callOnlyNTimes
   * @function
   *
   * @param {Function|Object} f the function to be called only n times

   * @param {Number} n number of time the function f() should be called
   *  
   * @description creates a function that calls and runs the function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times. For instance if n = 1 and the function is called 200 times, it would call or execute f() only once (no more than once). If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and no more than 5 times.
   * 
   * @return {Function|Object} a function that calls fn() only n times
   * 
   */
  callOnlyNTimes(fn, n = 1) {
      let done = false
      return (...args) => {
          if (!done) {
              done = true
              for (let i = 0; i < Math.abs(n); i++) {
                  fn(...args)
              }
          }
      }
  }

   /**
   * @name callFirstOnlyNTimes
   * @function
   *
   * @param {Function|Object} f the function to be called only n times
   * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
   * @param {Number} n number of time the function f() should be called
   *  
   * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
   * 
   * @return {Function|Object} a function that calls fn() only n times and g() afterward
   * 
   */
  callFirstOnlyNTimes(f = () => {}, g = () => {}, n = 1) {
      let done = false
      return (...args) => {
        if (!done) {
          done = true
          if (typeof n !== 'number' || n % 1 !== 0) {
            f(...args)
          } else {
            for (let i = 1; i <= Math.abs(n); i++) {
              f(...args)
            }
          }
        } else {
          g(...args)
        }
      }
    }

  /**
   * @name inputsValid
   * @function
   *
   * @param {Function} arr  the array to validate
   * @param {Function} fn  the call back function to validate
   * @param {Number} flat arr flattening depth to validate
   *  
   * @description validates inputs
   * 
   * @return {Boolean} true if inputs are valid and false if inputs are invalid
   * 
   */
    inputsValid(arr = [], fn = () => {}, flat = 1){
      if (!Array.isArray(arr)) return false
      if (typeof fn !== 'function') return false;
      if (typeof flat !== 'number' || flat < 0 || (flat % 1 !== 0 && flat !== Infinity)) return false;
      return true
    }

   /**
   * @name none
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array
   * 
   * @return {Array|Object} array, the filtered array for which the predicate is true
   * 
   */
    none (arr = [], fn = () => false, flat = 0){
     return this.inputsValid(arr, fn, flat) ? arr.flat(flat).every(v => !fn(v)) : false
  };

   /**
   * @name forEachAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  loops an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successful
   * 
   */
  forEachAsync (arr = [], fn = () => false, flat = 0){
      if(this.inputsValid(arr, fn, flat)){
          return arr.flat(flat).reduce((promise, value) => promise.then(() => fn(value)), Promise.resolve());
      }else{
          return undefined
      }
     
  }
      
  /**
   * @name mapAsync
   * @function
   *
   * @param {Array|Object} arr the array to loop through
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  maps an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successful
   * 
   */
  mapAsync(arr = [],fn = () => [], flat = 0){
      return  this.inputsValid(arr, fn, flat)? Promise.all(arr.flat(flat).map(fn)): []
  }

  /**
   * @name filterAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  filters an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successful
   * 
   */

  filterAsync (arr = [], fn = () => [], flat = 0){
      if(this.inputsValid(arr, fn, flat)){
          return this.mapAsync(fn, flat).then(array => arr.flat(flat).filter((v, i) => Boolean(array[i])));
      }else{
          return []
      }
  }

  /**
   * @name reduceAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  reduces an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successful
   * 
   */

  async reduceAsync (arr =[], fn = () => {}, init, flat = 0){
     if(this.inputsValid(arr, fn, flat)){
      return Promise.resolve(init).then(accumulator => this.forEachAsync(arr.flat(flat), async (v, i) => {
          accumulator = fn(accumulator, v, i)
      }).then(() => accumulator));
     }else{
         return 0
     }
  }
  /**
   * @name filter
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array
   * 
   * @return {Array|Object} array, the filtered array
   * 
   */
  filtered (arr = [], fn = () => [], flat = 1){
      return this.inputsValid(arr, fn, flat) ? arr.flat(flat).filter(x => fn(x)) : []
  }

  /**
   * @name filterItems
   * @function
   * 
   * @param {Array|Object} arr the array to filter
   * @param {String} query any filtering query
   *  
   * @description asynchronously read a query and filter arrays according to the query
   * 
   * @return {Array}  the query filtered array
   * 
   */
  filterItems(query, arr = []){
      if (!Array.isArray(arr)) return []
      return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 

   /**
   * @name some
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array according to the thruthiness of the predicate
   * 
   * @return {Boolean} true if at least one of the array items for which the predicate is true if found. false otherwise
   * 
   */
  some(arr = [], fn = () => false, flat = 0){
      return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x || fn(y), false) : false
  } 

  /**
   * @name every
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array according to the thruthiness of the predicate
   * 
   * @return {Boolean} true if each one of the array items for which the predicate is true if found. false otherwise
   * 
   */
  every(arr = [], fn = () => false, flat = 0) {
     if(this.inputsValid(arr, fn, flat)){
      let result = [];
      arr.flat(flat).reduce((x, y) => (x === false && fn(y) ? result.push(y) : result.pop()), false);
      return result.length === arr.flat(flat).length ? true : false;
     }else{
         return false
     }
  }

  /**
   * @name forEach
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description performs fn() operation for each of the array elements
   * 
   * @return {Function|Object} the resulting object or array or element from the fn() operation 
   * 
   */

  forEach(arr = [], fn = () => false, flat = 0) {
      if(this.inputsValid(arr, fn, flat)){
          for (let i = 0; i < arr.flat(flat).length; i++) {
              fn(arr.flat(flat)[i]);
          }
      }else{
          return undefined
      }
  };

  /**
   * @name filter
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array according to the thruthiness of the predicate
   * 
   * @return {Array} the resulting array
   * 
   */

  filter(arr = [], fn = () => false, flat = 0) {
     if(this.inputsValid(arr, fn, flat)){
      let result = [];
      for (let i = 0; i < this.flat(flat).length; i++) {
          fn(arr.flat(flat)[i]) ? result.push(arr.flat(flat)[i]) : [];
      }
      return result.length > 0 ? result : [];
     }else{
         return []
     }
  };

  /**
   * @name flatten
   * @function
   *
   * @param {Array} arr the array to flatten
   *  
   * @description flatten an array to whatsover depth or level it has
   * 
   * @return {Array} the resulting flattened array
   * 
   */

  flatten (arr =[]) {
      const result = [];
      arr.forEach(el => (Array.isArray(el) ? result.push(...flatten(el)) : result.push(el)));
      return result;
  };

   /**
   * @name findIndex
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description find the index of an array element
   * 
   * @return {Array} the resulting array element
   * 
   */
  findIndex (arr = [], fn = () => false, flat = 0) {
      if(this.inputsValid(arr, fn, flat)){
          return arr.flat(flat).reduce((x, y, z) => (x === -1 && fn(y) ? z : x), -1);
      }else{
          return undefined
      }

      
  };

  /**
   * @name map
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description maps each element with the resulting operation of the callback function
   * 
   * @return {Array} the resulting array 
   * 
   */
  map (arr = [], fn = () => [], flat = 0) {
      return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x.concat(fn(y)), []) : []
  };

  /**
   * @name find
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description find the first array element for which the predicate is true
   * 
   * @return {Array} the resulting array element
   * 
   */
  find (arr = [], fn = () => false, flat = 0) {
       if(this.inputsValid(arr,fn,flat)){
          return arr.flat(flat).reduce((x, y) => (x === undefined && fn(y) ? y : x), undefined);
       }else{
           return undefined
       }
  };

   /**
   * @name billOnceAndOnlyOnce
   * @function
   *
   * @param {Function|Object} bill the function to call for billing

   * @param {Function|Object} doNotBill the function to call to avoid billing
   *  
   * @description creates a function that is called and runs only onces no matter how many times the function is called or used in the loop. For instance if the function is called 200 times, it would be called or executed only the first round (no more than once); that is it would 1 time and not run the rest of 199 times.
   * 
   * @return {Function|Object} a function that bills only once not matter what
   * 
   */

  billOnceAndOnlyOnce(bill, doNotBill) {
    let timeToBill = bill
    return (...args) => {
      let result = timeToBill(...args)
      timeToBill = doNotBill
      return result
    }
  }

   /**
   * @name broadcast
   * @function
   *
   * @param {String} channel the broadcasting channel
   * 
   * @description creates a new broadcasting channel
   * 
   * @return {Object} the broadcasting object
   * 
   */
  broadcast(channel) {
    return new BroadcastChannel(channel)
  }

  /**
   * @name receive
   * @function
   *
   * @param {String} channel the broadcasting channel
   * 
   * @description receives a new broadcasting channel message
   * 
   * @return {Object} the event data object
   * 
   */
  receive(channel) {
    this.broadcast(channel).onmessage = event => {
      return event.data
    }
  }

  /**
   * @name send
   * @function
   *
   * @param {Object} message the broadcasting channel message
   * @param {String} channel the broadcasting channel
   * 
   * @description post messages to broadcasting channel
   * 
   * @return {Object} the broadcasting object
   * 
   */
  send(message, channel) {
    this.broadcast(channel).postMessage(message)
  }

    /**
   * @name events
   * @function
   *
   * @param {String} name name of the custom event 
   * @param {Object} detail detail options or data of the custom event
   * @param {Object} options options for the custom event
   * 
   * @description  create a new custom event
   * 
   * @return {Event} the new custom event
   * 
   */
  events(name, detail = {}, options = {
    bubbles: true,
    composed: true,
    detail: detail
  }) {
    return new CustomEvent(name, options)
  }

    /**
   * @name isNotEmpty
   * @function
   *
   * 
   * @description checks to see if window.localStorage is empty
   * 
   * @return {Boolean} true if it is empty; false otherwise
   * 
   */
  isNotEmpty() {
    return !!(localStorage.length > 0)
  }

   /**
   * @name isPresent
   * @function
   *
   * @param {String} localObject string representing the same of the local storage object/item
   * 
   * @description checks for the presence of an item in local storage
   * 
   * @return {Boolean} true if the object is found; false otherwise
   * 
   */
  isPresent(localObject) {
    return !!(window.localStorage.getItem(localObject) !== null)
  }

   /**
   * @name getLocalData
   * @function
   *
   * @param {String} data string representing the same of the local storage object/item
   * 
   * @description gets item from local storage
   * 
   * @return {String|Object} the local storage item 
   * 
   */
  getLocalData(data) {
    return JSON.parse(window.localStorage.getItem(data))
  }

    /**
     * @name callFirstOnlyNTimes
     * @function
     *
     * @param {Function|Object} f the function to be called only n times
     * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
     * @param {Number} n number of time the function f() should be called
     *  
     * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
     * 
     * @return {Function|Object} a function that calls fn() only n times and g() afterward
     * 
     */
  callFirstOnlyNTimes(f, g = () => {}, n = 1) {
    let done = false
    return (...args) => {
      if (!done) {
        done = true
        if (typeof n !== 'number' || n % 1 !== 0) {
          f(...args)
        } else {
          for (let i = 1; i <= Math.abs(n); i++) {
            f(...args)
          }
        }
      } else {
        g(...args)
      }
    }
  }


     /**
     * @name connectedCallback (element's life cycle)
     * @function
     * 
     * @description browser calls this method when the element is added or mounted to the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
    connectedCallback() {}

    /**
     * @name disconnectedCallback (element's life cycle)
     * @function 
     * 
     * @description browser calls this method when the element is removed or disconnect from the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
	  disconnectedCallback() {}

	  /**
     * @name observedAttributes (element's life cycle)
     * @function
     * 
     * @description array of attribute names to monitor for changes
     * 
     * @return does not return anything
     * 
     */
	  static get observedAttributes() {return []}

	  /**
     * @name attributeChangedCallback (element's life cycle)
     * @function
     * 
     * @description called when one of attributes listed above is modified (the attributes listed in the array returned by the observedAttribues method above)
     * 
     * @return does not return anything
     * 
     */

	  attributeChangedCallback(name, oldValue, newValue) {}

	  /**
     * @name adoptedCallback (element's life cycle)
     * @function
     * 
     * @description called when the element is moved to a new document
     * 
     * @return does not return anything
     * 
     */
	  adoptedCallback() {}
}
customElements.define("base-element", BaseElement);
export default BaseElement