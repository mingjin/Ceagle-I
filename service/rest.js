/**
* REST request class
*
* User: bryanmac
* Date: 2/10/12
* Ref: https://github.com/bryanmacfarlane/nodefun/blob/master/express/helloworld/service/rest.js
*/

var http = require("http");
var https = require("https");

/**
* getJSON: REST get request returning JSON object(s)
* @param options: http options object
* @param callback: callback to pass the results JSON object(s) back
*/
exports.get = function(options, onResult){
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = eval("(" + output + ")");
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};