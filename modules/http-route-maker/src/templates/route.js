module.exports = (options = {}) => `
"use strict";

const Router = require('${options.routerPath}');

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
    
    const Route = new Router(app);

    Route.get("/${options.endpoint}", (req, res, next) => {});
    Route.post("/${options.endpoint}", (req, res, next) => {});
    Route.get("/${options.endpoint}/:id", (req, res, next) => {});
    Route.post('/${options.endpoint}/:id', (req, res, next) => {})
    Route.put("/${options.endpoint}/:id", (req, res, next) => {});
    Route.delete("/${options.endpoint}/:id", (req, res, next) => {});  
}
` 