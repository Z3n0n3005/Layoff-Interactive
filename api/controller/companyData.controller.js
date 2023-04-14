const companyDomain = require("./companyData/index")

module.exports = (app) => {
    app.get('/companyData/getAll', companyDomain.getAll)
}