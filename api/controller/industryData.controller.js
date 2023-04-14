const industryDomain = require("./industryData/index")

module.exports = (app) => {
    app.get('/industryData/getAll', industryDomain.getAll)
}