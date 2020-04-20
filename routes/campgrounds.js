var express = require(`express`);
var router = express.Router();
var Campground = require(`../models/campground`);
var middleware = require("../middleware");

//campground get and new

router
  .route(`/`)
  .get((req, res) => {
    return Campground.find({})
      .then(allCampgrounds => {
        res.render(`campgrounds/index`, { campgrounds: allCampgrounds });
      })
      .catch(err => {
        console.error(err);
      });
  })
  .post(middleware.isLoggedIn, (req, res, next) => {
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampground = {
      name: name,
      image: image,
      description: description,
      author: author,
      price: price
    };
    console.log(req.user);

    Campground.create(newCampground, (err, newlyCreated) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Newly created campground: ${newlyCreated}`);
        next();
      }
    });
    //redirect back to campgrounds page
    res.redirect("/");
    console.log("Added " + newCampground["name"]);
  });

router.get('/', function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render(`campgrounds/index`, { campgrounds: allCampgrounds })
    }
  });
});

//campground get new route
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//campground show route
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// EDIT CAMPGROUND ROUTE

router.get(`/:id/edit`, middleware.confirmCampgroundOwner, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      req.flash(`error`, `Campground not found`);
    } else {
      res.render(`campgrounds/edit`, { campground: foundCampground });
    }
  });
});

// UPDATE CAMPGROUND ROUTE

router.put(`/:id`, middleware.confirmCampgroundOwner, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect(`/campgrounds`);
      } else {
        res.redirect(`/campgrounds/` + req.params.id);
      }
    }
  );
});

// Destroy campground Route
router.delete(`/:id`, middleware.confirmCampgroundOwner, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    res.render(`campgrounds`);
  });
});

module.exports = router;
