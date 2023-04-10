"use strict";
      
const Router = require('../modules/router');
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
                  
    Route.get("/", (req, res, next) => {
        res.status(200).send({welcome: 'Welcome to raw nodejs'});
    });  
}
