var express = require("express");  
var async = require('async');
var rest = require('unirest');
var http = require('http');
var app = express();  

app.get("/", function(request, response) { 
    console.log("call received!");
    async.parallel({
            time: function(callback) {
                rest.get("http://localhost:3002").end(function(res) {
                    callback(null, res.body);
                })
            },
            rand: function(callback) {
                rest.get("http://localhost:3003").end(function(res) {
                    callback(null, res.body);
                })
            }
        },
        function(err, results) {
            if (!err) {
                response.send(
                    "Hello stranger!" +
                    "\n- today is " + results.time.time +
                    "\n- your lucky number is " + results.rand.number +
                    "\n");
                response.send();        
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

