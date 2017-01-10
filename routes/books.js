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
  models.book.find({}).populate('category').exec(function(err, books){
    res.render('books/index.twig', {books: books});
  });
});



router.get('/create', function(req, res, next) {
  models.category.find({}).exec(function(err, categories){
    res.render('books/create.twig', {categories : categories});
  });
});

router.post('/', function(req, res, next) {
  var book = new models.book(req.body);
  book.save(function(err, b){
    return res.redirect('/books');
  });
});

router.get('/:id', function(req, res, next) {
  models.category.find({}).exec(function(e, categories){
    models.book.findById(req.params.id, function(err, book) {
      if(err) res.redirect('/books');
      res.render('books/edit.twig', {book : book, categories : categories});
    });
  });
});

router.post('/:id', function(req, res, next) {
  models.book.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, book) {
    res.redirect('/books');
  });
});

router.get('/:id/delete', function(req, res, next) {
  models.book.findByIdAndRemove(req.params.id, function() {
    res.redirect('/books');
  });
});

module.exports = router;
