
require('dotenv').config();
const App = require('./app');
const app = App();



// app.get('/',(req, res) => res.status(200).send({message:  'Hello'}))
// app.get('/me',(req, res) => res.status(200).send({home:  'Welcome'}))
app.listen(3000, () => console.log('running on http://localhost:3000'));




