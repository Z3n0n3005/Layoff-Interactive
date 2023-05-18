const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const JM = require('json-mapper');
const fs = require('fs');


app.use(bodyParser.json({limit: '5000mb'}))
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

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

    let rawdataCompany = fs.readFileSync('../data/company.json');
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

    let rawdataIndustry = fs.readFileSync('../data/industry.json');
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

    let rawdataAdmin = fs.readFileSync('../data/admin.json');
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