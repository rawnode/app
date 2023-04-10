#!/usr/bin/env node

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CLI
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc CLI class
 */

const Controller = require('../modules/http-controller/src');
const HTTPRoute = require("../modules/http-route-maker");
const Couleur = require("../modules/couleurs");
class CLI extends require("../modules/base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(CLI);
    // auto invoke methods
    this.autoinvoker(CLI);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  command(index = 2){
    return process.argv[index]
 }

//  commands(){
//   switch(this.command(2)){
//       case "make":
//         const {make} = new Controller ({command: this.command(2)})
//           if(this.command(3)){
//             if(this.command(4)){
//               console.log('EXTRA OPTIONS ARE NOT ALLOWED');
//             }else{
//               make(this.command(3))
//             }
//           }else{
//             console.log('make controller command')
//           }
//           break;
//       default: 
//           console.log("invalid command ...");
//           break;
//   }
// }
 commands(){
  const {Red} = new Couleur
  switch(this.command(2)){
      case "make":
          if(this.command(3)){
            switch(this.command(3)){
              case "controller":

               if(!this.command(4)){
                return console.log(Red("controller name needed"))
               }
                const {make} = new Controller ({command: this.command(3)})
                make(this.command(4))
              case "route":
                const httpRoute = new HTTPRoute({ command: this.command(3) });
                if(!this.command(4)){
                  return console.log(Red("rouute name needed"))
                 }
                 httpRoute.make(this.command(4));
                // if (this.command(4)) {
                //   if (this.command(5)) {
                //     httpRoute.makeWith(this.command(4), this.command(5));
                //   } else {
                //    httpRoute.make(this.command(4));
                //   }
                // } else {
                //   console.log("invalid command");
                // }
                break;
              default: 
                console.log("invalid command ...");
                break;
            }
          }
        break;
      case "man":
        console.log('make man page');
        break;
      case "help":
        console.log("help man page");
        break;
      default: 
        console.log("invalid command ...");
        break;
  }
}
  init(){
    this.commands();
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
      return ["init"];
    }

}

module.exports = new CLI;