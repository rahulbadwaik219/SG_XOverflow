const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'SG overflow secret', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'SG overflow secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          await console.log(user);
          req.user = user;
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
}

// get current user
const getUser = (req, res, next) => {
  const token = req.cookies.jwt;
  let user;
  if(token) {
    user = jwt.verify(token, 'SG overflow secret');
    req.user = user;
    next();
  }
  else {
    //TODO need to handle errors better here
    next();
  } 
}

module.exports = { requireAuth, checkUser, getUser };