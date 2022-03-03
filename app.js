'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require("./controller");
const app = express();
const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.get("/", (req, res) => ctrl.processData());

app.listen(port, () => {
    console.log("Data Cruncher ready");
    console.log(`hosted at http://localhost:${port}/`);
 });