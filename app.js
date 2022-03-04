'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require("./controller");
const app = express();
const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.get("/", async (req, res) => { 
    try {
        let json = await ctrl.processData(req.query.name);
        res.json(json);
    } catch (e) {
        res.json(e);
    }    
});

app.listen(port, () => {
    console.log("Data Cruncher ready");
    console.log(`hosted at http://localhost:${port}/`);
 });