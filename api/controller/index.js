const companyDataController = require('./companyData.controller')
const industryDataController = require('./industryData.controller')
const dataController = require('./data.controller')
const adminDataController = require('./adminData.controller')

module.exports = (app) => {
    companyDataController(app);
    industryDataController(app);
    dataController(app);
    adminDataController(app);
}