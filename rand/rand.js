var express = require("express");  
var http = require('http');
var app = express();  

app.get("/", function(request, response) {  
	var result = Math.round(Math.random() * 100)
    response.json({ number: result });
});                                         

app.listen(3003, function() {                       
    console.log("Random service started on port 3003");
});