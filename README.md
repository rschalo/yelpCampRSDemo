# yelpCampRSDemo
This is a full stack MEN web app that allows users to add, comment on, and edit campsites, complete with user authentication.

<h3>Technologies Used</h3>
<h4>Front End</h4>
The front end of the application was written using HTML, CSS, JavaScript, jQuery, and Bootstrap.
jQuery was used to enable the functionality of Bootstrap.

<h4>Middleware</h4>
Express.js was used as the server framework for this web app. Templating was built using EJS.
The Router feature was used to reduce repetitive code and I implemented promises in some routes to update to ES6 (still in progress).

<h4>Back End</h4>
The back end of the application uses Node.js, MongoDB, Mongoose, and Passport.
MongoDB was used as a NoSQL solution because forms could receive unstructured that would make a SQL implementation incomplete.
Mongoose helps connect the MongoDB server to the web app.
Passport provides the authentication strategies for the web app.

<h3>How to Use</h3>
To use the app, first navigate to "View all Campgrounds". From there, you can view the different campgrounds and select one to find out more information.
You must then create a login to add or edit a comment on that campground.
If you would like to create a new campground, you must also create a login and can then use the "Add New Campground" feature.
