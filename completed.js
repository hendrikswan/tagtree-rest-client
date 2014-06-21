#ver 1

var http = require('http');

var options = {
  host: 'api-sandbox.oanda.com',
  port: 80,
  path: '/v1/quote?instruments=USD_ZAR',
  method: 'GET'
};

http.request(options, function(res) {
  res.setEncoding('utf8');
  var body = '';
  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function(){
    var price = JSON.parse(body);
    console.log(price);
  });

}).end();



#ver 2
var http = require('http');

function getJSON(options, cb){
    var req = http.request(options, function(res) {
      var body = '';
      res.on('data', function (chunk) {
        body += chunk;
      });

      res.on('end', function(){
        var result = JSON.parse(body);
        cb(result);
      });

    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
      cb(e);
    });

    req.end();
}

var options = {
  host: 'api-sandbox.oanda.com',
  port: 80,
  path: '/v1/quote?instruments=USD_ZAR',
  method: 'GET'
};

getJSON(options, function(err, result){
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
});







exports.getJSON = function(options, cb)
{

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            cb(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};



