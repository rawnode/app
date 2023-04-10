
module.exports = (template = require('./template')) => ({
    mailRegistration: (options = {}) => template(options.data)
})