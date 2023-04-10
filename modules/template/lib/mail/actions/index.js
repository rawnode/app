"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Action
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Action class
 */

// require("../../src/config/Env");
const Account = require('./account');
class Action extends require("../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Action);
    // auto invoke methods
    this.autoinvoker(Action);
    // add other classes method if methods do not already exists. Argument order matters!
    this.methodizer(Account);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
}

module.exports = Action;
