var express = require("express");  
var async = require('async');
var http = require('http');
var app = express();  

app.get("/", function(request, response) { 
    async.parallel({
            google: function(callback) {
                http.get("http://www.google.com", function(res) {
                    console.log("google done");
                    callback(null, res.statusCode);
                })
            },
            yahoo: function(callback) {
                http.get("http://www.yahoo.com", function(res) {
                    console.log("yahoo done");
                    callback(null, res.statusCode);
                })
            }
        },
        function(err, results) {
            if (!err) {
                console.log("all done");
                console.log(results.google);
                console.log(results.yahoo);
                response.send("Hello stranger!\n");        
            } else {
                console.log(err);
                response.send("Hello stranger!\n");        
            }
        }
    );
});                                         

app.listen(3001, function() {                       
    console.log("Hello service started on port 3001");
});