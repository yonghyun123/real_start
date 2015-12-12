var express = require('express'),
    Post = require('../models/Post'),
    Question = require('../models/Question');
var router = express.Router();

/* GET posts listing. */

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      res.redirect('/signin');
    }
}

router.get('/', function(req, res, next) {
  Post.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {posts:docs});
  });
});

router.get('/new', function(req, res, next) {
  res.render('posts/new');
});

router.post('/', function(req, res, next) {
  var post = new Post({
    title: req.body.title,
    email: req.body.email,
    content: req.body.content
  });

  post.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    Question.find({post: post.id}, function(err, questions) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', {post: post, questions: questions});
    });
  });
});

router.post('/:id/comments', function(req, res, next) {
  var question = new Question({
    post: req.params.id,
    email: req.body.email,
    content: req.body.content
  });

  question.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + req.params.id);
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'delete for survey');
    res.redirect('/posts/'+req.params.id);
  });
});

router.delete('/:id/del', function(req, res, next) {
  Question.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'delete for question');
    res.redirect('/posts/'+req.params.id);
  });
});

module.exports = router;
