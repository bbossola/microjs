var express = require("express");
var rest = require('unirest');
var app = express();  

var port = (process.argv.length > 2) ? parseInt(process.argv[2],10) : 3200

app.get("/ping", function(request, response) { 
    console.log("ping received :)")
    response.send("pong\n");        
});

app.get("/", function(request, response) {  
    var now = new Date().toISOString();   
    response.json({
        time: now
    });
});                                         

app.listen(port, function() {                       
    console.log("Time service started on port "+port);
});


setInterval(function() {
    rest.post("http://localhost:3000/time/"+port).end();
}, 5000);