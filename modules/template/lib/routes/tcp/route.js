module.exports = (options = {}) => `
"use strict";

const Router = require("express").Router

/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!
|
*/
module.exports = app => {

    const ${options.name} = new Router(app)
    
    ${options.name}.get("/${options.endpoint}", (req, res, next) => {});
    ${options.name}.post("/${options.endpoint}", (req, res, next) => {});
    ${options.name}.get("/${options.endpoint}/:id", (req, res, next) => {});
    ${options.name}.post('/${options.endpoint}/:id', (req, res, next) => {})
    ${options.name}.put("/${options.endpoint}/:id", (req, res, next) => {});
    ${options.name}.delete("/${options.endpoint}/:id", (req, res, next) => {});  
}
` 