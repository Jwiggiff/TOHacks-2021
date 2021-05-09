const express = require("express");
const app = express();
var path = require("path");
var dataServicesAuth = require("./data-services-auth")
var dataService = require("./data-service")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

const exphbs = require("express-handlebars");
const sessions = require("client-sessions");

app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "default" }));
app.set("view engine", ".hbs");

app.use(
  sessions({
    cookieName: "session",
    secret: "JohnCena",
    duration: 7 * 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60,
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    // Not logged in
    res.redirect("/login");
  } else {
    next();
  }
}

function ensureLoggedOut(req, res, next) {
  if (req.session.user) {
    // Logged in
    res.redirect("/dashboard");
  } else {
    next();
  }
}

// GET Methods ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/dashboard", ensureLogin, function (req, res) {
  res.render("dashboard");
});

app.get("/login", ensureLoggedOut, function (req, res) {
  res.render("login", {
    email: req.query.email,
  });
});



app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/logout", function(req, res) {
  req.session.reset();
  res.redirect("/");
});

app.get("/explore", function (req, res) {
  res.render("explore");
});

app.get("/rewards", function (req, res) {
  res.render("rewards");
});

app.get("/settings", function (req, res) {
  res.render("settings");
});


// POST Methods ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/register", function(req, res) {
  dataServicesAuth.registerUser(req.body)
  .then(() => res.render('register', { successMsg: "User created!"}))
  .catch((err) => res.render('register', { errorMsg: err, userName: req.body.userName }));
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const user = {
  username: "sampleuser",
  password: "samplepassword",
  email: "sampleuser@example.com",
};

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
    // Render 'missing credentials'
    return res.render("login", { errorMsg: "Missing credentials." });
  }

  // use sample "user" (declared above)
  if (email === user.email && password === user.password) {
    // Add the user on the session and redirect them to the dashboard page.
    req.session.user = {
      email: user.email,
    };

    res.redirect("/dashboard");
  } else {
    // render 'invalid username or password'
    res.render("login", { errorMsg: "invalid email or password!" });
  }
});

// initialize ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use(express.static("public"));

dataServicesAuth.initialize()
.then(function(msg) {
    console.log(msg);
    app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
})
.catch(function(err) {
    console.log(err);
});

app.use(function (req, res) {
  res.status(404).send("Page Not Found");
});
