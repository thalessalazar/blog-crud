const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const databaseConnection = require('./database/database');

const categoriesController = require('./controller/categories/CategoriesController');
const articlesController = require('./controller/articles/ArticlesController');

const categoryModel = require('./model/CategoryModel');
const articleModel = require('./model/ArticleModel');

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
databaseConnection
    .authenticate()
    .then(() => {
        console.log('conexão feita com sucesso');
    })
    .catch((error) => {
        console.log(error);
    })

app.use('/', categoriesController);
app.use('/', articlesController);


app.get('/', (req,res) => {
    res.render('index');
});

app.listen('3333', () => {
    console.log('Servidor rodando');
})