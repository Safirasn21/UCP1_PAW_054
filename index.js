// Import required libraries
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

// Define the routes
const loginRoutes = require("./src/routes/router-login");
const registerRoutes = require("./src/routes/router-register");
const pupukRoutes = require("./src/routes/router-pupuk");
const appRoutes = require("./src/routes/route-app");

// Configure the session middleware
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "123",
        name: "secretName",
        cookie: {
            sameSite: true,
            maxAge: 60000, // 1 minute
        },
    })
);

// Use other middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

// Prevent caching
app.use(function (req, res, next) {
    res.setHeader(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.setHeader("Pragma", "no-cache");
    next();
});

// Set the view engine and views directory
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Use defined routes
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/pupuk", pupukRoutes);
app.use("/", appRoutes);

// Log registered routes
console.log(app._router.stack);

// Start the server
app.listen(5050, () => {
    console.log("Server running on port 5050");
});
