

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Registration
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Registration class
 */

 const { createReadStream } = require("fs");

class Registration extends require("../../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
          Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Registration);
    // auto invoke methods
    this.autoinvoker(Registration);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);

     // add other objects' methods if methods do not already exist. Argument order matters!
    // this.methodizeProperty(require('./lib')())
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  render(data = this.data) {
    const readable = createReadStream("../resources/mail/activation.html", {
      encoding: "utf-8"
    });

    readable.on("data", (chunk) => {
      var replace = "(?<={{).*?(?=}})";
      var re = new RegExp(replace, "g");
      console.log(chunk.toString().replace(re, (string) => data[string]).replace(/[{}]/g,''));
    });
    readable.on("error", (error) => console.log(error));
    readable.on("end", () => console.log("done!"));
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

module.exports = Registration
