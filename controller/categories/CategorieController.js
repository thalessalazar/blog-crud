const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const categoryModel = require('../../model/CategoryModel');

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
    let title = req.body.title;

    if (title != undefined) {
        categoryModel.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            console.log('Categoria cadastrado com sucesso!');
            res.redirect('/');
        });
    }
    else {
        console.log('Titulo Undefined');
        res.redirect('/admin/categories/new');
    }
});

module.exports = router;