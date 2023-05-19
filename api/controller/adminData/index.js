const { adminData } = require('../../db');

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

module.exports = { authenticate, test }