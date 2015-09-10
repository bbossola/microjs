var express = require("express");  
var async = require('async');
var rest = require('unirest');
var http = require('http');
var app = express();  

var port_time;
var port_rand;

app.get("/", function(request, response) { 
    console.log("Call received!");
	console.log("Will call \"time\" at port "+port_time)
	console.log("Will call \"rand\" at port "+port_rand)

    async.parallel({
            time: function(callback) {
                rest.get("http://localhost:"+port_time).end(function(res) {
                    callback(null, res.body);
                })
            },
            rand: function(callback) {
                rest.get("http://localhost:"+port_rand).end(function(res) {
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

setInterval(function() {
    rest.get("http://localhost:3000/time/").end(function(res) {
        port_time = res.body.port;
    });

    rest.get("http://localhost:3000/rand/").end(function(res) {
        port_rand = res.body.port;
    });
}, 2500);