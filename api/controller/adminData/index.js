const { adminData, companyData} = require('../../db');

const authenticate = async (req, res) => {
    const { UserName, Password } = req.body;
    console.log(req.body)
    if(UserName === undefined || Password === undefined){
        return res.json({ status: 400, message: 'Undefined' })
    }
    const data = await adminData.findOne({ where: { UserName, Password } });
    if (data) {
        return res.json({ status: 200, message: 'Login Successful' })
    }
    else {
        return res.json({ status: 400, message: 'Login Failed' })
    }
}

const test = async (req, res) => {
    return res.json({ status: 200, message: 'Login Successful' })
}
const getAll = async (req, res) => {
    const allData = await adminData.findAll();
    return res.json(allData)
}

module.exports = { authenticate, test, getAll }