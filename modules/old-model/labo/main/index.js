const {createWriteStream, createReadStream, existsSync, unlink, readFile} = require('fs');
const {Readable} = require('stream')


const db = connect('mongodb://localhost:27017/mongosh');
db.users.insertOne({
    firstname: 'Claude', 
    lastname: 'Gnande', 
    email: 'andre.demaison@gmail.com',
    phone: '385-732-9832',
    age: 40
})
const users = db.users.find();

const all  = []
users.forEach(user => all.push(user))

let path  = 'latest-user.json'
if(existsSync(path)){
    path  = `latest-user-${new Date()}.json`;
}
const writable = createWriteStream(path, 'utf-8')
Readable.from(JSON.stringify(all[all.length -1])).pipe(writable)

// const getLastestUser = async path  => new Promise((resolve, reject) =>{
//     readFile(path, 'utf-8', (err, data) => {
//         if(err) return reject(err)
//         resolve(data)
//     })
// })

// getLastestUser('last_post.json').then(console.log).catch(console.log)

