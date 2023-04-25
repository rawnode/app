
const db = connect( 'mongodb://localhost:27017/city' );
printjson( db.cities.find( {} ) );