const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const categoryModel = require('../../model/CategoryModel');

//Redirect routes
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

//CRUD Routes
//Create
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

//Read
router.get('/admin/categories', (req, res) => {
    categoryModel.findAll().then(categories => {
        res.render('admin/categories/', { categories: categories });
    });
});

//Delete
router.post('/categories/delete', (req, res) => {
    let id = req.body.id;


    if (id != undefined) {

        if (!isNaN(id)) {
            categoryModel.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories/');
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/admin/categories/edit/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    categoryModel.findByPk(id).then(categoria => {
        if(categoria != undefined){
            res.render('/admin/categories/edit', {categoria: categoria});
        } else {
            console.log('erro no else')
            res.redirect('/admin/categories');
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/admin/categories');
    })
});


module.exports = router;