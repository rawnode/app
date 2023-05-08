
    
  require('dotenv').config();
  
  const {createWriteStream, existsSync} = require('fs');
  const {Readable} = require('stream');
  
  const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
    const findById = ( id = 'CX',collection = 'cities', db = connect('mongodb://localhost:27017/city')) => {
      
        const data = db[collection].findOne({_id: ObjectId("CX")});
    
        let path = dataJsonFilePath('/databases/cities.json');
        if(existsSync(path)) path = dataJsonFilePath('/databases/cities-1682642322770.json');
    
        Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
    }
    findById('CX','cities'); 