const companyDataController = require('./companyData.controller')
const industryDataController = require('./industryData.controller')

module.exports = (app) => {
    companyDataController(app);
    industryDataController(app);
}