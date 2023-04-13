const dataDomain = require("./companyData/index")

module.exports = (app) => {
    app.get('/data/getAll', dataDomain.getAll)
}