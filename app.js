//jsjomt esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
let items = [];
let workItems = [];


app.use(bodyParser.urlencoded({ extended: true }));

//フォルダー・ファイルを使用できるようにする。
//img | css など！
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    let day = today.toLocaleDateString("en-JP", options);

    //let currentDay = today.getDay();
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



    res.render("list", { listTitle: day, itemArray: items});
});






app.post("/", function(req, res){
    const inputValue = req.body.btn;
    const item = req.body.newItem


    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
   
    let day = today.toLocaleDateString("en-JP", options);
    
    if (inputValue === "Work List"){
        if (item != ""){
            workItems.push(item);
            res.redirect("/work");  
        } else {
            res.redirect("/work");  
        }
        } else if (inputValue === "clear Work List") {
            workItems = [];
            res.redirect("/work");   
        

} else if (inputValue === day) {
        if (item != ""){
            items.push(item);
            res.redirect("/");  
        } else {
            res.redirect("/");  

        }
        
} else if (inputValue === "clear " + day) {
        items = [];
        res.redirect("/");
        

    } 
});


    
    


app.get("/work", function (req, res) { 
    res.render("list", {listTitle: "Work List", itemArray: workItems});

 });





app.listen(3000, function () {
    console.log("server is running on 3000");
});
