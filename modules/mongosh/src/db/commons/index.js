'use strict';

/*
|------------------------------------------------------------------------------------
| Universal Module Definition (UMD)
|------------------------------------------------------------------------------------
|
| This is an implementation of the Universal Module Definition (UMD) pattern
| for creating a module that can be used in both browser and Node.js environments.


| 'root' refers to the global object (i.e. window in the browser, global in Node.js)
| 'factory' is a callback function that is called to create the module.
|
*/

((root, factory) => {

    /*
    |----------------------------------------------------------------------------------
    | AMD module support
    |----------------------------------------------------------------------------------
    |
    | Inside the anonymous function, the code checks the type of the defined variable.
    | If it exists and is a function, then the module is being loaded using 
    | an AMD (Asynchronous Module Definition) loader. In this case, the code uses
    | the define function to create the module.

    |
    */

    if (typeof define === 'function' && define.amd) define(['exports'], factory);

    /*
    |---------------------------------------------------------------------------------
    | CommonJS module support
    |---------------------------------------------------------------------------------
    |
    | If define does not exist, the code checks if exports is an object and
    | has a property called nodeName that is not a string. If so,
    | then the module is being loaded using a CommonJS module loader.
    | In this case, the factory function is called with the exports object,
    | which is then used to export the module.
    |
    */

    else if (typeof exports === 'object' && typeof exports.nodeName === 'string') factory(exports);

    /*
    |----------------------------------------------------------------------------------------
    | Browser globals
    |----------------------------------------------------------------------------------------
    |
    | Finally, if neither define nor exports are defined, then the code assumes that 
    | the module is being loaded in the browser and creates the module as a property of
    | the root object (i.e. window.common).
    |
    */

    else factory((root.common = {}));

})(this, exports => {

    /*
    |-----------------------------------------------------------------------------------------
    | THE ACTUAL LOADING FUNCTIONS OR OBJECTS
    |-----------------------------------------------------------------------------------------
    |
    | The second argument to the anonymous function is another callback function
    | that takes an exports argument. This function is where the actual module code is defined.
    | In this case, the code defines a single function called contact,
    | which is attached to the exports object.
    |
    */
     
    exports.path = (path = '', base = process.cwd()) => require('path').join(base, path)

    exports.queryBuilder = (query = {}) => typeof query === 'object' ? JSON.stringify(query) : JSON.stringify({});
    
    exports.use = () => `
        require('dotenv').config();

        const {createWriteStream, existsSync} = require('fs');
        const {Readable} = require('stream');

        const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
`
    
})