const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


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

    var newData = generateData()
    // console.log(newData)

    await newData.map((item) => {
        db.data.create({
            x: item[0],
            y: item[1]
        })
    })
}

initDb();
// Call controller
const controller = require('./controller/index');
controller(app);

app.listen(8080, '0.0.0.0');