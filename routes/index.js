var express = require(`express`);
var router = express.Router();
var passport = require(`passport`);
var User = require(`../models/user`);

//root route
router.get('/', function(req, res) {
  res.render('landing');
});

//register route
router.get(`/register`, function(req, res) {
  res.render(`register`);
});
//handle sign up logic
router.post(`/register`, function(req, res) {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.error(err);
      req.flash(`error`, err.message)
      res.render(`register`);
    } else {
      passport.authenticate(`local`)(req, res, function() {
        req.flash(`success`, `Welcome to YelpCamp ` + user.username)
        res.redirect(`/campgrounds`);
      });
    }
  });
});
//show and post login form
router.get(`/login`, function(req, res) {
  res.render(`login`);
});

//login route
router.post(
  `/login`,
  passport.authenticate(`local`, {
    successRedirect: `/campgrounds`,
    failureRedirect: `/login`
  })
);
//logout route
router.get(`/logout`, function(req, res) {
  req.logout();
  req.flash(`success`, `Logged you out!`);
  res.redirect(`/campgrounds`);
});

module.exports = router;
