// export method for 'routes'
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // generate signed token
const expressJwt = require('express-jwt'); //authorization check
const { errorHandler }  = require('../errhelp/dbErrorHandler');

// request user  info aand create new user
exports.signup = (req, res) => {
    // console.log("req.body", req.body);
     const user = new User(req.body);
     user.save((err, user) =>    {
          if(err) {
                  return res.status(400).json({
                          err: errorHandler(err)
                  })
          }
          // hiding unwated data info in error message 
          user.salt = undefined;
          user.hashed_password = undefined;
          res.json ({
                  user
          });
     });
};


// signIn processs
exports.signin = (req, res) => {
// find user based on email
const {email, password} = req.body;
User.findOne({email}, (err, user) => {  
   if(err || !user) {
             return res.status(400).json({
                error:"User with that email does not exist.Please SignUp."
             });
    }
// user found
// authentication method
if(!user.authenticate(password)) {
        return res.status(401).json({
                error: "Email and password don`t much"
        });
}
//generate a signed token with user id
const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
res.cookie('t', token, { expire: new Date() + 9999 });
//return response with user info to the front end client
const{ _id, name, email, role } = user;
return res.json({ token, user: { _id, email, name, role } });
  
  });

};

// signout method
exports.signout = (_req, res) => {
       res.clearCookie('t');
       res.json({ message: 'SignOut success' });
};

exports.requireSignin = expressJwt ({
        secret: process.env.JWT_SECRET,
        userProperty:"auth"
});

exports.isAuth = (req, _res, _next) => {
        let user = req.profile && req.auth && req.profile._id == req.auth._id;
        if(!user) {
           return res.status(403).json({
                   error:"Access denied"
           });
        }
        _next();
};

exports.isAdmin = (_req, res, _next) => {
       if(re.profile.role === 0) {
          return res.status(403).json({
                error: "Admin. Access denied"
          });
       }
_next();
};