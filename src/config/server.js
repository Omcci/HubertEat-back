const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())


const recipesRouter = require('../modules/recipes')
const usersRouter = require('../modules/users')
const menusRouter = require('../modules/menus')


app.use('/recipes', recipesRouter)
app.use('/users', usersRouter)
app.use('/menus', menusRouter)



module.exports = app;