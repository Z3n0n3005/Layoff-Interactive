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

    let rawdata = fs.readFileSync('../data/company_json.json');
    let input = JSON.parse(rawdata);
    // var input = generateData()
    console.log(input);

    // await input.map((item) => {
    //     console.log(item);
        // db.companyData.create({
        //     Year: item["Year"],
        //     Quarter: item["Quarter"],
        //     Company: item["Company"],
        //     NumberOfLayOff: item["NumberOfLayOff"]
        // })
    // })

    for(let item of input){
        console.log(item);
      
        db.companyData.sync({force: true}).then(function () {
            // Table created
            return db.companyData.create({
                Year: item["Year"],
                Quarter: item["Quarter"],
                Company: item["Company"],
                NumberOfLayOff: item["NumberOfLayOff"]
            })
        });
    
    }
}

initDb();
console.log(db.companyData);

// Call controller
const controller = require('./controller/index');
controller(app);

app.listen(8080, '0.0.0.0');