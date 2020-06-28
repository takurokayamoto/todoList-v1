//jsjomt esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
var items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var today = new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day = today.toLocaleDateString("en-JP", options);

    //var currentDay = today.getDay();
    // var dayText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // var day = "";
    // if (currentDay < 7) {
    //     day = dayText[currentDay];
    // } else {
    //     console.log(`There is something wrong with "CurrentDay" variable. Please check -> ` + currentDay);
    // }



    //EJS Code
    // <% if (kindOfDay === "Saturday" || kindOfDay === "Sunday") { %>
    //     <h1 style="color: rgb(238, 146, 34);">It's <%= kindOfDay %> !</h1>
    //     <h2>Here is your to do list</h2>
    //     <% } else { %>
    //     <h1 style="color: rgb(105, 71, 25);">It's <%= kindOfDay %> !</h1>
    //     <h2>Here is your to do list</h2>
    //     <% } %>



    res.render("list", { kindOfDay: day, itemArray: items});
});


app.post("/", function(req, res){
    const inputValue = req.body.btn;
    if (inputValue === "add"){
        var item = req.body.newItem;
        items.push(item);
    
        res.redirect("/");
    } else {
        items = [];
        res.redirect("/");

    }
    
});



app.listen(3000, function () {
    console.log("server is running on 3000");
});
