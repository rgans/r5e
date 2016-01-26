var authorize = function(req, res, next) {
    console.log('<><><><>', req.user.identity.isAuthenticated);
  if (req.user && req.user.identity.isAuthenticated) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/admin/signin');
    console.log('User not logged');
  }
};

module.exports = authorize;