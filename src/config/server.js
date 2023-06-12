const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())


const recipesRouter = require('../modules/recipes')


app.use('/recipes', recipesRouter)


module.exports = app;