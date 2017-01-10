var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');
var Account = models.account;

router.get('/register', function(req, res){
    Account.register(new Account({ username : 'admin' }), 'admin', function(err, account) {});
    res.redirect('/login');
});

router.get('/login', function (req, res) {
    res.render('login.twig');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));

router.get('/', function (req, res) {
    models.book.find({}).populate('category').exec(function (err, books) {
        res.render('index.twig', {books: books});
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/articlelist', function(req, res, next) {
  models.book.find({}).populate('category').exec(function(err, books){
    res.json(books);
  });
});

module.exports = router;
