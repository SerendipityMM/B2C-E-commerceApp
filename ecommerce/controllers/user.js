// export method for 'routes'
const User = require('../modules/user');
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