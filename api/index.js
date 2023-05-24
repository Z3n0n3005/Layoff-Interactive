const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const JM = require('json-mapper');
const fs = require('fs');


const multer  = require('multer')
// const upload = multer({ dest: '../client/public/data/' })
const path = require('path')


app.use(bodyParser.json({limit: '5000mb'}))
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


// store data file
// fieldname = field name specified in the form (industry/company)
// post method = "/uploadFiles"
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/data/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + ".json") //Appending extension
    }
  })
  
const upload = multer({ storage: storage });

const filesUpload = () => {
    if (req.files.industry) {
        fs.rename("../client/public/data/industry.json", "../client/public/data/industry_" + Date.now() + ".json", function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
    }

    if (req.files.company) {
        fs.rename("../client/public/data/company.json", "../client/public/data/company_" + Date.now() + ".json", function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
    }

    upload.fields([{ name: 'industry', maxCount: 1 }, { name: 'company', maxCount: 1 }])
}
app.post('/uploadFiles', filesUpload, function (req, res, next) {
    for (const file of req.files) {
        console.log(file)
    }
})



const generateData = () => {
    return Array(10).fill(0).map(() => ([
       parseInt(Math.random() * 90 + 10),
       parseInt(Math.random() * 90 + 10)
    ]))
}

const db = require('./db/index')

const initDb = async () => {
    

    // console.log(db)
    await db.sequelize.sync({ force: true })

    await db.data.sync({ force: true });

    let tempArr = generateData();

    for(let data of tempArr){
        await db.data.create({
            x: data[0],
            y: data[1]
        })
    }

    let rawdataCompany = fs.readFileSync('../client/public/data/company.json');
    let input = JSON.parse(rawdataCompany);
    // console.log(input);

    await db.companyData.sync({ force: true });

    for(let item of input){
        // console.log(item);
      
        await db.companyData.create({
                Time: item["Time"],
                Company: item["Company"],
                NumberOfLayOff: item["NumberOfLayOff"]
            })
        
    
    }

    let rawdataIndustry = fs.readFileSync('../client/public/data/industry.json');
    input = JSON.parse(rawdataIndustry);
    // console.log(input);

    await db.industryData.sync({ force: true });

    for(let item of input){
        // console.log(item);
      
        await db.industryData.create({
                Time: item["Time"],
                Industry: item["Industry"],
                NumberOfLayOff: item["NumberOfLayOff"]
            })
        
    
    }

    let rawdataAdmin = fs.readFileSync('../client/public/data/admin.json');
    input = JSON.parse(rawdataAdmin);
    // console.log(input);

    await db.adminData.sync({ force: true });

    for(let item of input){
        // console.log(item);
      
        await db.adminData.create({
                UserName: item["username"],
                Password: item["password"]
            })
        
    
    }
}

initDb();

// Call controller
const controller = require('./controller/index');
controller(app);

app.listen(8080, '0.0.0.0');