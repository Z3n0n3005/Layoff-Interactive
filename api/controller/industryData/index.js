const { industryData } = require("../../db");

const getAll = async (req, res) => {
    const allData = await industryData.findAll();
    return res.json(allData)
}

module.exports = { getAll }