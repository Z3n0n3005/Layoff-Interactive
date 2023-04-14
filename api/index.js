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

    let rawdataCompany = fs.readFileSync('../data/company_json.json');
    let input = JSON.parse(rawdataCompany);
    console.log(input);

    await db.companyData.sync({ force: true });

    for(let item of input){
        console.log(item);
      
        await db.companyData.create({
                Year: item["Year"],
                Quarter: item["Quarter"],
                Company: item["Company"],
                NumberOfLayOff: item["NumberOfLayOff"]
            })
        
    
    }

    let rawdataIndustry = fs.readFileSync('../data/industry_json.json');
    input = JSON.parse(rawdataIndustry);
    console.log(input);

    await db.industryData.sync({ force: true });

    for(let item of input){
        console.log(item);
      
        await db.industryData.create({
                Year: item["Year"],
                Quarter: item["Quarter"],
                NumberOfLayOff: item["NumberOfLayOff"]
            })
        
    
    }
}

initDb();

// Call controller
const controller = require('./controller/index');
controller(app);

app.listen(8080, '0.0.0.0');