const dataDomain = require("./data/index")

module.exports = (app) => {
    app.get('/data/getAll', dataDomain.getAll)
}