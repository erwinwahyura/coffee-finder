'use strict'

var User = require('../models/userRegis');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);


var userSignUp = (req,res)=>{
  var hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    username: req.body.username,
    password: hash
  },(err,result)=>{
    if (err) {
      res.send(err.message)
    }
    // console.log(result);
    res.send(result)
  })
}

var userSignIn = (req,res) =>{
  User.findOne({username: req.body.username})
  .then(data=>{
    console.log(data);
    if (bcrypt.compareSync(req.body.password, data.password)) {
      let token = jwt.sign({
        id: data._id,
        username: data.username,
        email: data.email,
    },'secret', { expiresIn: '1d'})
    console.log('token login: '+token);
    res.json({
      message: 'Signin success',
      id: data._id,
      username: data.username,
    })
  }else {
    res.json({
      message: "invalid password"
    })
   }
  })
}

var getAllUser = (req,res)=>{
  User.find({},(err,result)=>{
    if (err) {
      res.send(err.message)
    }
    console.log(result);
    res.send(result)
  })
}

var signInFB = (req,res)=>{
  User.findOne({'uuid':req.body.uuid},(err,data)=>{
    if (err) {
      res.send(err);
    }
    console.log('=====================>',data);
    if (data !== null) {
      res.send(data);
    }
    data.uuid = req.body.uuid || data.uuid;
    data.name = req.body.name || data.name;
    data.gender = req.body.gender || data.gender;
    data.email = req.body.email || data.email;
    data.username = req.body.username || data.username;
    data.password = req.body.password || data.password;

    data.save((err,data) =>{
      if (err) {
        res.send(err)
      }
      res.send(data)
      console.log('signin success');
    })
  })
}


module.exports = {
  userSignUp,
  userSignIn,
  signInFB,
  getAllUser
};
