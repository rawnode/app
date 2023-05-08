'use strict';

/*
|------------------------------------------------------------------------------------
| Universal Module Definition (UMD)
|------------------------------------------------------------------------------------
|
| This is an implementation of the Universal Module Definition (UMD) pattern
| for creating a module that can be used in both browser and Node.js environments.


| The function is wrapped in an immediately invoked function expression (IIFE),
| which allows the module to have its own private scope and prevent any variable conflicts with other code.
| 
| The global variable is passed as a parameter to the function. In the browser,
| the global variable refers to the window object, while in Node.js it refers to the global scope.
|
*/

(global => {

    /*
    |----------------------------------------------------------------------------------
    | MODULE DEFINITION
    |----------------------------------------------------------------------------------
    |
    | The module is defined as an object or a function.

    |
    */

    require('dotenv').config();
    const {common} = require('../commons');
    const {use, queryBuilder} = common;
    const replaceOneQueryString = (query = {}, data = {}, collection = process.env.DB_COLLECTION) => `
    ${use()}

        const document = connect('${process.env.DB_URL}')['${collection}'].replaceOne(${queryBuilder(query)}, ${queryBuilder(data)});

    
        let path = dataJsonFilePath('/databases/${collection}.json');
        if(existsSync(path)) path = dataJsonFilePath('/databases/${collection}-${Date.now()}.json');

        Readable.from(JSON.stringify(document)).pipe(createWriteStream(path, 'utf-8'));
        
     `

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the replaceOneQueryString object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = replaceOneQueryString;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.replaceOneQueryString.
    |
    */

    else global.replaceOneQueryString = replaceOneQueryString;
})(this)