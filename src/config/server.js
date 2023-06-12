const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())


// const techniqueRouter = require('../modules/technique')


// app.use('/technique', techniqueRouter)


module.exports = app;