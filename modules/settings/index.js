
// const {routeSettings} = require('./src/routes');


const {createWriteStream, existsSync, mkdirSync, writeFileSync } = require('fs');

const writeToHomeRouter = (path = 'routes', file = 'homeRouter.js') => {
    const writable = createWriteStream(process.cwd() + `/${path}/${file}`, 'utf8');
    writable.write(
`"use strict";
      
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
`
    )
    writable.end();
}
const writeToIndex = (path = 'routes') => {
    const writable = createWriteStream(process.cwd() + `/${path}/index.js`, 'utf8');
    writable.write(
        `'use strict';
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
    
  require("./homeRouter")(app);        

}
`
    )
    writable.end();
}
const createRoutesIndex = (path = 'routes') => {
    writeFileSync(process.cwd() + `/${path}/index.js`, '');
    // console.log('favicon.ico file created successfully in public directory!');

}
const createHomeRouter = (path = 'routes', file = 'homeRouter.js') => {
    writeFileSync(process.cwd() + `/${path}/${file}`, '');
    // console.log('favicon.ico file created successfully in public directory!');

}

const createRoutesDirectory = (path = 'routes', file = 'homeRouter.js') => {
    mkdirSync(process.cwd() + `/${path}`, { recursive: true });
    // console.log('routes directory created successfully!');
    if (!existsSync(process.cwd() + `/${path}/${file}`)) {
        // writeFileSync(process.cwd() + `/${path}/${file}`, '');
        // console.log('favicon.ico file created successfully in public directory!');
        writeToHomeRouter(path, file);
    }

    if (!existsSync(process.cwd() + `/${path}/index.js`)) {
        // writeFileSync(process.cwd() + `/${path}/index.js`, '');
        // console.log('favicon.ico file created successfully in public directory!');
        writeToIndex(path)
    }
}


const routeSettings = (path = 'routes', file = 'homeRouter.js') => {
    if (!existsSync(process.cwd() + `/${path}`)) {
        createRoutesDirectory(path, file)
    }
    else {
        if (!existsSync(process.cwd() + `/${path}/${file}`)) {
            // createHomeRouter(path, file)
            writeToHomeRouter(path)
        }

        if (!existsSync(process.cwd() + `/${path}/index.js`)) {
            // createRoutesIndex(path)
            writeToIndex(path)
        }
    }
}

(() => {
  ((path, file) => {
    if (!existsSync(process.cwd() + `/${path}`)) {
      mkdirSync(process.cwd() + `/${path}`, { recursive: true });
      console.log('public directory created successfully!');
      if (!existsSync(process.cwd() + `/${path}/${file}`)) {
        writeFileSync(process.cwd() + `/${path}/${file}`, 'This is a new file!');
        console.log('favicon.ico file created successfully in public directory!');
      }
    } else {
      if (!existsSync(process.cwd() + `/${path}/${file}`)) {
        writeFileSync(process.cwd() + `/${path}/${file}`, 'This is a new file!');
        console.log('favicon.ico file created successfully in public directory!');
      }
    }
  })
  ('public', 'favicon.ico');

  ((path, file) => {
    routeSettings(path,file)
  })
  ('routes', 'homeRouter.js');

  // (path => {
  //   routesSettings(path)
  // })
  // ('app/controllers/http')
})()