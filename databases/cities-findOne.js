
    
        require('dotenv').config();

        const {createWriteStream, existsSync} = require('fs');
        const {Readable} = require('stream');

        const dataJsonFilePath = (path = '', base = process.cwd()) => require('path').join(base, path);


        const document = connect('mongodb://localhost:27017/city')['cities'].findOne({"code":"KP"}, {});

    
        let path = dataJsonFilePath('/databases/cities-findOne.json');
        if(existsSync(path)) path = dataJsonFilePath('/databases/cities-findOne-1683508556217.json');

        Readable.from(JSON.stringify(document)).pipe(createWriteStream(path, 'utf-8'));
        
     