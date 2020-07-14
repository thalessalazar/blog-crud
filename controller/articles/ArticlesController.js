const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Rota de artigo');
});

router.get('/admin/articles/new', (req,res) => {
    res.send('Rota para criar um novo artigo no admin');
});

module.exports = router;