var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

var superSecret = 'ilovescotchyscotch';

router.post('/register', function(req, res, next) {
    User.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  router.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
      name: req.body.name
    }, function(err, user) {
  
      if (err) throw err;
  
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
  
        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
  
          // if user is found and password is right
          // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        admin: user.admin     };
          var token = jwt.sign(payload, superSecret);
  
          // return the information including token as JSON
          res.json({
            name: req.body.name,
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        } 
      }
  
    });
  });


module.exports = router;
