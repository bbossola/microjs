var express = require("express");  
var http = require('http');
var app = express();  

app.get("/", function(request, response) {  
    response.send("Hello stranger!\n");        
});                                         

app.listen(3001, function() {                       
    console.log("Hello service started on port 3001");
});