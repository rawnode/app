const {cleaner} = require('../helpers');

exports.findByIdBuild = (results, data =  {})  => {
    for (let datum of results) {
        for (let el of datum.split(',')) {
            let index = el.indexOf(':');
            let key = el.substring(0, index).trim();
            let value = el.substring(index + 1).trim();
            data[key] = cleaner(value);
            if (Number.isInteger(parseInt(cleaner(el.substring(index + 1).trim())))) {
                data[key] = Number(parseInt(cleaner(el.substring(index + 1).trim())));
            } else {
                data[key] = cleaner(el.substring(index + 1).trim()).toString()
            }
        }
    }
    return data
}