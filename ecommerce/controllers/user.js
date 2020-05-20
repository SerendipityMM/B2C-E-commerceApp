// export method for 'routes'
const User = require('../modules/user');
const jwt = require('jsonwebtoken'); // generate signed token
const expressJwt = require('express-jwt'); //authorization check
const {errorHandler} = require('../errhelp/dbErrorHandler');

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



exports.signin = (req, res) => {
// find user based on email
const {email, password} = req.body
User.findOne({email}, (err, user) => {  
   if(err || !user) {
             return res.status(400).json({
                error:"User with that email does not exist.Please SignUp."
             });
    };
// user found
// authentication method
if(!user.authenticate(password)) {
        return res.status(401).json({
                error: "Email and password don`t  much"
        });
};
//generate a signed token with user id
const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
res.cookie('t', token, {expire: new Date() + 9999});
const{_id, name, email, role} = user;
return res.json({token, user:{_id, name, email, role}});


 });

};