"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Billing
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Billing class
 */


class Billing extends require("../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Billing);
    // auto invoke methods
    this.autoinvoker(Billing);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
 
}

module.exports = Billing;
