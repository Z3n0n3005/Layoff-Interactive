# Web-project-barebone-example
Just for reference

## To setup
```
cd client
npm install
cd ../api
npm install
npm run setup-example-db

//new terminal
cd ./api
node index.js

//new terminal
cd ./client
npm start

//kill port
netstat -aon | findstr :<port>
taskkill /PID <PID> /F
```
## GET APIs
- Fetch all industry: ```localhost:8080/industryData/getAll```  
    - Response:  
    ```
    [
        {
            "id": 1,
            "Time": "2022/12",
            "Industry": "Total nonfarm",
            "NumberOfLayOff": 1475,
            "createdAt": "2023-05-18T09:29:22.000Z",
            "updatedAt": "2023-05-18T09:29:22.000Z"
        },
        ...
    ]
    ```
- Fetch all company ```localhost:8080/companyData/getAll```  
    - Response:  
    ```
    [
        {
            "id": 1,
            "Time": "2021/3",
            "Company": "Google",
            "NumberOfLayOff": 0,
            "createdAt": "2023-05-18T09:29:20.000Z",
            "updatedAt": "2023-05-18T09:29:20.000Z"
        },
        ...
    ]
    ```

## POST APIs
- Fetch all company ```localhost:8080/adminData/authenticate```  
    - Request header:  
    ```
    'Content-Type': 'application/x-www-form-urlencoded'
    ```
    - Response:  
    ```
    [
        {
            "status": 200,
            "message": "Login Successful"
        },
        {
            "status": 400,
            "message": "Login Failed"
        }
        ...
    ]
    ```

## Reference links
- [Map D3 example implementation](https://d3-graph-gallery.com/graph/choropleth_basic.html)  
- [Using React with D3](https://wattenberger.com/blog/react-and-d3)  
- [How to query params in GET and POST in JavaScript](https://webtips.dev/solutions/send-query-params-in-get-and-post-in-javascript)  
- [Sequelize basics](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
- [How to use Sequelize with NodeJs and MySSQL](https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql)
- [How to create a React frontend and a Node/Express backend and connect them](https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)
