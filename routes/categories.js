var express = require('express');
var router = express.Router();
var models = require('../models');

router.use(function(req, res, next){
    if(req.user == undefined){
        res.redirect('/');
    }else{
        next();
    }
});

router.get('/', function(req, res, next) {
    models.category.find({}).exec(function(err, categories){
        res.render('categories/index.twig', {categories : categories});
    });
});

router.get('/create', function(req, res, next) {
    res.render('categories/create.twig');
});

router.post('/', function(req, res, next) {
    var category = new models.category({name: req.body.name});
    category.save(function(err, c){
        res.redirect('/categories');
    });
});

router.get('/:id', function(req, res, next) {
    models.category.findById(req.params.id, function(err, category) {
        if(err) res.redirect('/categories');
        res.render('categories/edit.twig', {category : category});
    });
});

router.post('/:id', function(req, res, next) {
    models.category.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name}}, function(err, category) {
        res.redirect('/categories');
    });
});

router.get('/:id/delete', function(req, res, next) {
    models.category.findByIdAndRemove(req.params.id, function() {
        res.redirect('/categories');
    });
});

module.exports = router;
