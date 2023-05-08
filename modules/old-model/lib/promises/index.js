exports.path = (path = '', base = process.cwd()) => require('path').join(base, path);

exports.promise  = async (path = this.path('/databases/all.js'), ClassName, results = []) =>  await new Promise((resolve, reject) => {
        unlink(path, err => {
            if (err) {
                ClassName.emit('get-error', err);
                reject({ error: 'Error getting data'})
            }
            ClassName.emit('get-error', err);
            resolve(this.build(results))
        });
    })
