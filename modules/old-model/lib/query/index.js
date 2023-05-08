
exports.findByIdQuery =  (id = '', path = this.path('/databases/findById.js'), ClassName) => {

    if (existsSync(path)) path = `${path.split('.js')[0]}-${Date.now()}.js`;
  
    const writable = createWriteStream(path, 'utf8');
    writable.write(`const db = connect("${ClassName.connection}/${ClassName.db}");\n`)
    writable.write(`printjson(db.${ClassName.collection}.findOne({_id: ObjectId("${id}")}));\n`)
    writable.end();
}

