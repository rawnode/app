const fs = require('fs');

const db = connect('mongodb://localhost:27017/mongosh');
// db.employees.insertMany( [
//    { "name": "Alice", "department": "engineering" },
//    { "name": "Bob", "department": "sales" },
//    { "name": "Carol", "department": "finance" }
// ] )
const document = db.employees.findOne();

console.log(document)

// fs.writeFileSync('employee.json', JSON.stringify(document));