const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())


const usersRouter = require('../modules/users')


app.use('/users', usersRouter)


module.exports = app;