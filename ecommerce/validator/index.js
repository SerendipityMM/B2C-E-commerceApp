// validate the user info/data for SignUp
exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 6 and 32 characters')
       .mathes(/.+\@.+\..+/)
       .withMessage('Email ust contain @')
       .isLength({
           min: 4,
           max: 32
       });
       req.check('password', 'Password is required').notEmpty();
       req.check('password')
          .withMessage('Password must contain at least 6 characters')
          .isLength({ min: 6 })
          .mathes(/\d/)
          .withMessage('Password must contain a number');
         

          const errors = req.ValidationErrors()
          if(errors) {
              const  firstError = errors.map(error => error.msg)[0];
              return res.status(400).json({error:firstError});
          }

next();
               
};