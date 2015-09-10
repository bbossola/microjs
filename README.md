# microjs
Examples of microservices written using NodeJS

In this first example we see an implementation of a self-discovery architectural pattern, using a central registry, where microservices enlist themselves while they can get information about others. Please note that this is an extremely simple example: do not use it in production and, generally, use it at your own risk :) (I dropped water on my laptop using it! solution? put your laptop in a drawer full of rice for the night, it works like a charm!)

The registry will start at port #3000, while the other services (time and rand) can be started at different ports: as soon as they are alive, they register themselves on the registry. The registry itself continuosly check that the registered services are still alive and kicking callling a /ping endpoint. The registry will be queried by the "hello" servlice in order to know where he can find the other two, used to produce its final output.

Using is simple: just checkout the project, go into the microservice folder, hit "npm install ." and then "node xxxx.js" to launch the service (with "rand" and "time" you can specify a port). The last service you should launch is the main "hello" that will contact the registry, call the service and produce the output: simply curl localhost:3001 to see what happens! At any time you can start (or kill) a "rand" or "time" instance, the registy will keep itself updated. You can have a look at it curling localhost:3000
