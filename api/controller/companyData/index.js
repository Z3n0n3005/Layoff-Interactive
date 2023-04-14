const { companyData } = require("../../db");

const getAll = async (req, res) => {
    const allData = await companyData.findAll();
    return res.json(allData)
}

module.exports = { getAll }