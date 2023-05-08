
require('dotenv').config();
// const Model = require('./modules/model')
// const  City = new Model({collection: 'cities'})

// City.find().then(console.log)

const Model = require('mongosh');

const City   = new Model({collection: 'cities'});

City.find().then(console.log);

