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

// huge thank you to https://www.youtube.com/watch?time_continue=71&v=imR9LlbG3pU&feature=emb_title for help setting process.env.MONGDB_URI in Heroku
console.log(process.env.DEVDB_URI);
console.log(process.env.MONGODB_URI);
mongoose.connect('mongodb+srv://rschalo:0rqJdPYxA5hVjujU@cluster0-pfvxq.mongodb.net/test?retryWrites=true&w=majority' || process.env.DEVDB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, () => { console.log('DB successfully connected')}).catch(err => console.log(err))

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
  console.log('YelpCamp server is live on', process.env.PORT);
});
