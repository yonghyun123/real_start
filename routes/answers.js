var express = require('express'),
    Post = require('../models/Post'),
    Question = require('../models/Question'),
    Answer=require('../models/Answer');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('answers/new', {});
});

router.post('/', function(req, res, next) {
  var answer = new Answer({
      answer: req.body.answer
   });

  answer.save(function(err) {
      if (err) {
        return next(err);
      }
    req.flash('success', 'Thank You For Your Answers');
    res.redirect('/posts');
  });
});



module.exports = router;
