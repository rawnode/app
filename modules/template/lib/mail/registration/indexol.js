"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Registration
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Registration class
 */

const template = require('./template');

class Registration extends require("../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Registration);
    // auto invoke methods
    this.autoinvoker(Registration);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  static Registration(data = {}) {
    return template(data);
  }
  registration(data = {}) {
    return template(data);
  }
 
}

module.exports = Registration;
