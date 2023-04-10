module.exports = (option = {}) => `'use strict';
/*
|--------------------------------------------------------------------------
| ${option.name} Schema
|--------------------------------------------------------------------------
|
| Here we you may add more options (keys) to you schema.
|
|
*/
const Schema  = require('db-schema');

const {makeSchema}  = new Schema;

 module.exports = makeSchema("${option.name}",{

  property: "string|min:2|max:10",

 }, "${option.type}") ;
`

