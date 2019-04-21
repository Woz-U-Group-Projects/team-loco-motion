var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
const passport = require('passport');
const connectEnsure = require('connect-ensure-login');

// SIGNUP ROUTES
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Username: req.body.username,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/users/login');
      } else {
        res.send('this user already exists');
      }
    });
});

// LOGIN ROUTE
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
}),
function (req, res, next) {
  res.redirect('profile/' + req.user.UserId)
  
}
);

// USER PROFILE ROUTE
router.get('/profile/:id', connectEnsure.ensureLoggedIn(), function(req, res) {
  if (req.user.UserId === parseInt(req.params.id)) {
    res.render('profile', {
      UserId: req.user.UserId,
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Email: req.user.Email,
      Username: req.user.Username,
      Password: req.user.Password,
      AdminUser: req.user.Admin,
      CreationDate: req.user.createdAt,
      UpdatedDate: req.user.updatedAt
    });
  } else {
    res.send('This is not your profile');
  }
});

// LOGOUT ROUTE
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users/login');
});

// USER LIST ROUTE
router.get('/', connectEnsure.ensureLoggedIn(), function(req, res) {
  // Both work by the way
  // if (req.user.Admin === true) {
  if (req.user.Admin) {
    // res.send('You HAVE admin credentials!');
    models.users
    .findAll({
      where: {
        Deleted: false
      }
    })
    .then(usersFound => {
      res.render('users', {
        users: usersFound
      });
    });
  } else {
    res.send('You need admin credentials to view this list');
  }
});

// SPECIFIC USER ROUTE
router.get('/specificUser/:id', (req, res, next) => {
  let userId = parseInt(req.params.id);
  models.users
    .find({
      where: {
        UserId: userId
      }
    })
    .then(user => {
      let admin;
      if (!user.admin){
        admin = false;
      }
      else {
        admin = true;
      }
      res.render('specificUser', {
        FirstName: user.FirstName,
        LastName: user.LastName,
        UserId: user.UserId,
        Email: user.Email,
        Username: user.Username,
        Password: user.Password,
        AdminUser: user.Admin,
        CreationDate: user.createdAt,
        UpdatedDate: user.updatedAt,
        Deleted: user.Deleted
      });
    });
});

// DELETED ROUTE
router.delete('/:id/delete', (req, res, next) => {
  let userDeleteId = parseInt(req.params.id);
  models.users
    .update(
      {
        Deleted: 'true'
      },
      {
        where: {
          UserId: userDeleteId
        }
      }
    )
        .then(user => {
          res.redirect('/users');
    });
});

module.exports = router;