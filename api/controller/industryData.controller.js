const dataDomain = require("./IndustryData/index")

module.exports = (app) => {
    app.get('/data/getAll', dataDomain.getAll)
}