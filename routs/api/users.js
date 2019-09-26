const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

const db=require('../../config/database');

const validetRegisterInput=require('../../validation/register');
const validetLoginInput=require('../../validation/login');
// load user model

const User = require('./../../models/Users');
const key = require('../../config/key').secreatOrKey;


// @route  GET api/users/test
// @desc   test users route
// @access public
router.get('/test', (req, res) => {
  res.json({
    "message": "users works"
  })
})

// @route  GET api/users/register
// @desc   register user
// @access public


// router.post('/register', (req, res) => {

//   const {errors,isValid}=validetRegisterInput(req.body);

//   // check validation
//   if(!isValid){
//     return res.status(400).json(errors); 
//   }
//   User.findOne({
//     email: req.body.email
//   }).then((user) => {
//     if (user) {
//       errors.email='email already exists';
//       return res.status(400).json(errors);
//     } else {
//       const avatar = gravatar.url(req.body.email, {
//         s: '200',
//         r: 'pg',
//         d: 'mm',
//       });
//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         avatar: avatar,
//         password: req.body.password
//       })
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser.save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err))
//         })
//       })
//     }
//   })
// })



// @route  GET api/users/login
// @desc   login user
// @access public

router.post('/login', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  const {errors,isValid}=validetLoginInput(req.body);

  // check validation
  if(!isValid){
    return res.status(400).json(errors); 
  }
  User.findOne({
      where:{
        name:name
      }
    })
    .then(user => {
      if (!user) {
        errros.name='user name not found';
        return res.status(404).json(errors);
      }

      if (password===user.password) {

        const payload = {
              name: user.name,
              isactive: user.isactive
            }
        jwt.sign(
          payload,
          key, 
          {
            expiresIn: 2592000
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
      }else {
            errors.password="password incorrect";
            res.status(400).json(errors)
          }        

    }).catch(err=>{
      errros.name='user name not found';
      return res.status(404).json(errors);
    })
})

// @route  GET api/users/current
// @desc   Return current user
// @access privet
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
  id:req.user.id,
  name:req.user.name,
  email:req.user.email
  })
})

module.exports = router;