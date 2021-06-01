const router = require('express').Router();

const controller = require('../controllers/auth-controller');
const passport = require('passport');

/** Register Admin */
router.post('/register/admin', controller.create_admin);
/** register User */
router.post('/register', controller.add_user);
/** Login User Locally */
router.post('/', controller.login);

/** auth with facebook */
router.get('/facebook', passport.authenticate('facebook', { 
    scope: ['email']
}));
/** callback route for facebook to redirect to */
router.get('/facebook/redirect', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

/** auth with Google */
router.get('/google', passport.authenticate('google', { 
    scope: ['email', 'profile']
}));
/** callback route for google to redirect to */
router.get('/google/redirect', passport.authenticate('google'), async (req, res) => {
    res.redirect('/');
});

router.get('/logout', controller.logout);

module.exports = router;