const adminDomain = require('./adminData/index');

module.exports = (app) => {
    app.post('/adminData/authenticate', adminDomain.authenticate)
}