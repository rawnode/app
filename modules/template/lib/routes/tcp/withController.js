module.exports = (options = {}) => `
"use strict";

const Router = require("http-route");

const ${options.controller.name} = require('${options.controller.depth}app/controllers/http/${options.controller.path}');

const {${options.result.methods}} = new ${options.controller.name};

/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are automatically mounted to your app.
|
| Now create something great!
|
*/
module.exports = app => {

    const ${options.router.name} = new Router(app);
    ${options.module}
   
}
` 