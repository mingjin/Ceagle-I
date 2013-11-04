var express = require('express'), 
    cons = require('consolidate');
var app = express();

app.configure(function(){
    app.use(express.logger());
    app.use(express.compress());
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.engine('html', cons.ejs);
    app.use(function(req, res, next){
      console.log('%s %s', req.method, req.url);
      next();
    });
});

app.get('/', function(req, res) {
    res.render('index.html')
});

app.listen(3000);
console.log('Listening on port 3000');