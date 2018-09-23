Web3js = require("web3");
var express = require("express");
var serverConfig = require('./serverConfig')
var router = require("./router");

var app = express();

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// Register routes.
router(app);

// Set the Ethereum network to be used.
var network = serverConfig.chain[serverConfig.defaultChain];

if(!serverConfig.infuraToken){
    console.log('\x1b[31m',"!!!... ERROR...!!!");
    console.log("Infura token not present. Please see Readme file for configuration.", '\x1b[0m')
}
else{
    // Create web3 js instance.
    web3 = new Web3js(new Web3js.providers.HttpProvider(network.url));

    var server = app.listen(process.env.PORT || serverConfig.port, function () {
            var port = server.address().port;
            console.info('\x1b[32m', "API connected to '" + network.name + "' and running on - localhost:" + port, '\x1b[0m');
    });
}

