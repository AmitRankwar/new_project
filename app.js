require('dotenv').config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override")
const flash = require("express-flash");
const session = require("express-session");

const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 5000; // Corrected port definition

connectDB(); // connect to db

// Below two lines are used to parse data from forms and to access JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// Static folder for CSS and images
app.use(express.static("public"));

//Express session
app.use(
    session({
        secret : 'secret',
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge : 1000 * 60 * 60 * 24 * 7 , // 1 week
        }
    })
);

//flash messages
app.use(flash({sessionKeyName:"flashMessage"}));

// Layout (templating engine)
app.use(expressLayouts);
app.set("layout", "layouts/main"); // Corrected path to layout file
app.set("view engine", "ejs");

// Home route

app.use("/" , require("./server/routes/customer"));


// Hnadle 404
app.get("*" , (req,res) => {
    res.status(404).render("404");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
