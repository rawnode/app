
    
  require('dotenv').config();
  
  const {createWriteStream, existsSync} = require('fs');
  const {Readable} = require('stream');
  
  const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);
  
    
    const find = (query = query, collection = 'cities', db = connect('mongodb://localhost:27017/city')) => {
    
      const collections = db[collection].find({"country_id":{"$gt":49}}, {});
    
      const all = [];
    
      collections.forEach(collection => all.push(collection));
    
      let path = dataJsonFilePath('/databases/cities.json');
      if(existsSync(path)) path = dataJsonFilePath('/databases/cities-1682546235977.json');
    
      Readable.from(JSON.stringify(all)).pipe(createWriteStream(path, 'utf-8'));
    }
    
    find('[object Object]','[object Object]','cities');
    