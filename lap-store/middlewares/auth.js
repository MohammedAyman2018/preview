module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if(req.isAuthenticated() && req.user.token !== null) {
      return next()
    }
    else if(req.isAuthenticated() && req.user.token == null) {
      return res.redirect('/');
    }
    else {
      req.flash('error_msg', "يجب عليك التسجيل أولاً.");
      res.redirect('/login');
    };
  }
}