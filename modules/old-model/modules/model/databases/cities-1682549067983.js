
    
  require('dotenv').config();
  
  const {createWriteStream, existsSync} = require('fs');
  const {Readable} = require('stream');
  
  const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
    const findById = ( id = '635919e22bc9cdd44701eed',collection = 'cities', db = connect('mongodb://localhost:27017/city')) => {
      
        const data = db[collection].findOne({_id: ObjectId("635919e22bc9cdd44701eed")});
    
        let path = dataJsonFilePath('/databases/cities.json');
        if(existsSync(path)) path = dataJsonFilePath('/databases/cities-1682549067983.json');
    
        Readable.from(JSON.stringify(data)).pipe(createWriteStream(path, 'utf-8'));
    }
    findById('635919e22bc9cdd44701eed','cities'); 