var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require(`passport`),
  LocalStrategy = require(`passport-local`),
  Campground = require('./models/campground'),
  Comment = require(`./models/comment`),
  User = require(`./models/user`),
  seedDB = require('./seeds'),
  methodOverride = require(`method-override`);
flash = require(`connect-flash`);

//requiring routes
var commentRoutes = require(`./routes/comments`),
  campgroundRoutes = require(`./routes/campgrounds`),
  indexRoutes = require(`./routes/index`);

//seedDB();

mongoose.connect(process.env.MONGODB_URI || PORT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, () => { console.log('we are connected')}).catch(err => console.log(err))

/*mongoose.connect("mongodb://localhost/yelp_camp_v3", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});*/
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + `/public`));
app.use(
  require(`express-session`)({
    secret: `Zoey is my favorite dog in the whole world`,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride(`_method`));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash(`error`);
  res.locals.success = req.flash(`success`);
  next();
});

app.use(`/`, indexRoutes);
app.use(`/campgrounds/:id/comments`, commentRoutes);
app.use(`/campgrounds`, campgroundRoutes);

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log('YelpCamp server is live');
});
