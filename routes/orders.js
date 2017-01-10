module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var models = require('../models');
    var os = require('os');

    router.get('/', function(req, res, next) {
        if(req.user == undefined){
            res.redirect('/');
        }else{
            res.render('orders.twig');
        }
    });

    router.get('/:id', function (req, res, next) {
        models.book.findById(req.params.id, function(err, book){
            if(err) res.redirect('/');
            var order = {
                user : os.hostname(),
                book: book.name,
                date: new Date(new Date().getTime()).toLocaleTimeString()
            };
            io.emit('order', order);
            res.redirect('/');
        });
    });

    return router;
};