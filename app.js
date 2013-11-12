var express = require('express'),
    cons = require('consolidate'),
    rest = require('./service/rest.js');
    
var app = express();

app.configure(function(){
    app.use(express.logger());
    app.use(express.compress());
    app.use(express.static(__dirname + '/public'));
    app.use(express.favicon(__dirname + '/public/img/favicon.ico', { maxAge: 2592000000 }));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.engine('html', cons.ejs);
    app.use(function(req, res, next){
      console.log('%s %s', req.method, req.url);
      next();
    });
});

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/ci', function(req, res) {
    rest.get({host: 'ci.jruby.org', path:'/api/json?tree=jobs[name,buildable,healthReport[score],lastBuild[result]]'}, function(status, result){
        var activeJobs = result.jobs.filter(function(job) {
            return job.buildable;
        });
        res.send(activeJobs);
    });
});

app.listen(3000);
console.log('Listening on port 3000');