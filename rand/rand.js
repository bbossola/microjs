var express = require("express"); 
var rest = require('unirest');
var app = express();  

var port = (process.argv.length > 2) ? parseInt(process.argv[2],10) : 3300

app.get("/ping", function(request, response) { 
    console.log("ping received :)")
    response.send("pong\n");        
});

app.get("/", function(request, response) {  
    var result = Math.round(Math.random() * 100)   
    response.json({
        number: result
    });
});                                         

app.listen(port, function() {                       
    console.log("Random service started on port "+port);
});


setInterval(function() {
    rest.post("http://localhost:3000/rand/"+port).end();
}, 5000);