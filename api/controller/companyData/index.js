const { data } = require("../../db");

const getAll = async (req, res) => {
    const allData = await data.findAll();
    return res.json(allData)
}

module.exports = { getAll }