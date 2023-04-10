module.exports = (options = {}) => `
"use strict";

/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes automatically mounted to the main app.
|
| Now create something great!
|
*/
module.exports = app => {    
    app.get("/${options.endpoint}", (req, res, next) => {});
    app.post("/${options.endpoint}", (req, res, next) => {});
    app.get("/${options.endpoint}/:id", (req, res, next) => {});
    app.post('/${options.endpoint}/:id', (req, res, next) => {})
    app.put("/${options.endpoint}/:id", (req, res, next) => {});
    app.delete("/${options.endpoint}/:id", (req, res, next) => {});  
}
` 