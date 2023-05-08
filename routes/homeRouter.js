"use strict";
require('dotenv').config();

const Router = require('../modules/router');

const CityControllers = require('../app/controllers/http/CityController')
const {index} = new CityControllers



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





    Route.get('/',index)
    // Route.get('/me',(req, res, next) => res.status(200).send({home:  'Welcome', message: 'Welcome Home'}))
    // Route.get('/post',(req, res, next) => res.status(200).send({home:  'Welcome', message: 'Welcome Home Posts'}))
    // Route.get('/city',(req, res, next) => res.status(200).send({home:  'Welcome', message: 'Welcome Home Posts'}))

    // Route.get("/", (req, res, next) => {
    //     res.status(200).send({ welcome: 'Welcome to raw nodejs' });
    // });

    // Route.get("/posts", (req, res, next) => {
    //     res.status(200).send( { title: 'Hello World' } )
    // });
}
