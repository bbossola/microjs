var express = require("express");  
var app = express();  

var registry = []

app.post("/:name/:port", function(request, response) {  
	var name = request.params.name
	var port = request.params.port
    var ports = registry[name]
    if (isNaN(ports)) {
    	ports=[]
    }
    ports.push(port)
    registry[name] = ports
    
    response.status(201);
    response.json({
        "name": name,
        "ports": ports
    });    
});

app.get("/:name", function(request, response) {  
	var name = request.params.name
    var ports = registry[name]
    if (isNaN(ports)) {
        response.status(404);
        response.json({
	        "name": name,
            "error": "Service "+name+" not found!"
        });
        return;
    }   
   
    response.json({
        "name": name,
        "port": ports[0]
    });
});

app.listen(3000, function() {                       
    console.log("Registry service started on port 3000");
});