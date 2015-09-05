var express = require("express");  
var http = require('http');
var app = express();  

app.get("/", function(request, response) {  
    var now = new Date();
    response.json({ time: now.toString() });
});                                         

app.listen(3002, function() {                       
    console.log("Hello service started on port 3002");
});