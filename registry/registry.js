var express = require("express");  
var rest = require('unirest');
var app = express();  

var registry = {}

app.post("/:name/:port", function(request, response) {  
    var name = request.params.name
    var port = request.params.port

    var ports = registry[name]
    if (ports === undefined) {
        ports = []
    }

    if (ports.indexOf(port) == -1) {
        ports.push(port)
        registry[name] = ports
        console.log("Registered service "+name+" at port "+port+" - registry: "+JSON.stringify(registry));
    }

    response.status(201);
    response.json({
        "name": name,
        "ports": ports
    });
});

app.get("/:name", function(request, response) {  
    var name = request.params.name
    var ports = registry[name]
    if (ports === undefined) {
        response.status(404);
        response.json({
            "name": name,
            "error": "Service " + name + " not found!"
        });
        return;
    }   

    response.json({
        "name": name,
        "port": ports[0]
    });
});

app.get("/", function(request, response) {  
    text = JSON.stringify(registry);
    response.write(text);
    response.end();
});

app.listen(3000, function() {                       
    console.log("Registry service started on port 3000");
});

setInterval(function() {

    function check(name, port) {
        var url = "http://localhost:" + port + "/ping";
        rest.get(url).end(function(res) {
            if (res.error) {
                registry[name] = ports.splice(index, 1)
                console.log("Service '" + name + "' at port " + port + " is NOT working - unregistering it!!!")
            }
        });
    }

    for (var name in registry) {
        var ports = registry[name];
        for (var index = 0; index < ports.length; index++) {
            check(name, ports[index]);
        }
    }
}, 10000);