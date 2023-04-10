"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Account
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Account class
 */

// require("../../src/config/Env");
const Activate = require('./activate');

class Account extends require("../../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Account);
    // auto invoke methods
    this.autoinvoker(Account);
    // add other classes method if methods do not already exists. Argument order matters!
    this.methodizer(Activate);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
}

module.exports = Account;
