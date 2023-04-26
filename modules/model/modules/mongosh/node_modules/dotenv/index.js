#!/usr/bin/env node

"use strict";

/**
 * Author
 *  @name Ericson S. Weah  
 *  @email afrosintech@gmail.com
 *  @website https://www.afrosintech.com
 *  @github https://github.com/afrosintech
 *  @gitlab https://gitlab.com/afrosintech
 *  @npm https://www.npmjs.com/~afrosintech
 *  @phone +1.385.204.5167
 *
 * @module DotEnv
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc DotEnv class
 */

class DotEnv extends require("./base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(DotEnv);
    // auto invoke methods
    this.autoinvoker(DotEnv);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

   static config(){

    const cleaner = (string = 'string')  => Array.from(string).filter(el => (el.trim().length !== 0 && el.trim() !== `"` && el.trim() !== `'`)).join('');
    try {
      const variables  = require('fs')
      .readFileSync(require('path').join(process.cwd(), '.env'), 'utf8')
      .split('\n').filter(str => str.trim().length !== 0 );

       for(let variable of variables){
          if(!process.env[cleaner(variable.split('=')[0])]) {
            process.env[cleaner(variable.split('=')[0])] = cleaner(variable.split('=')[1])
          };
       }
    } catch (err) {
      console.error(err);
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

module.exports =  DotEnv;
