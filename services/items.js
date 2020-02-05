const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const config = require('../config/index.js');
const DBConn = require('../db/connection');
const items = require('../handlers/items');
const cors = require('cors');

DBConn.init(config.getConfig("db"));

const api = express();
api.use(bodyParser.json());
api.use(cors());
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});
 api.use(
    jwt({
        secret: config.getConfig('jwt').key
     })
 );

api.get('/api/v1/items', items.getAll);
api.get('/api/v1/items/:id', items.getOne);
api.post('/api/v1/items/', items.save);
api.put('/api/v1/items/:id', items.replace);
api.patch('/api/v1/items/:id', items.update);
api.delete('/api/v1/items/:id', items.remove);

api.listen(8084, err => {
    if (err) {
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port 8084');
});