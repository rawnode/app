const fs = require('fs');

const db = connect('mongodb://localhost:27017/mongosh');
db.users.insertOne({
    firstname: 'Arsene', 
    lastname: 'Konde', 
    email: 'andre.demaison@gmail.com',
    phone: '385-732-9832',
    age: 40
})
const users = db.users.find();

const all  = []
users.forEach(user => all.push(user))
fs.writeFileSync('lastest-all.json', JSON.stringify(all));
