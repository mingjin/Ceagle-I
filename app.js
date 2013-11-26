var express = require('express'),
    cons = require('consolidate'),
    conf = require('./config/config.dev.js'),
    jenkins = require('./service/jenkins.js');
    
var app = express();

app.configure(function(){
    app.use(express.logger());
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.engine('html', cons.ejs);
    app.use(function(req, res, next){
      console.log('%s %s', req.method, req.url);
      next();
    });
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/index2.html', function(req, res) {
    res.render('index2');
});

app.post('/q', function(req, res) {
	jenkins.fetch(req.body, function(data){
		res.json(data);
	});
});

app.get('/qq', function(req, res) {
	jobs = JSON.parse(JSON.stringify(conf.jobs));
	
	Object.keys(conf.hosts).forEach(function(key){
		host = conf.hosts[key];
		jenkins.fetch(host, function(data) {
			data.forEach(function(job){
				Object.keys(jobs).forEach(function(key2) {
					job2 = jobs[key2];
					if (job2.name === job.name && job2.host === key) {
						job2.build = job;
					}
				});
			});
		});
	});
	
	pipeline = JSON.parse(JSON.stringify(conf.pipeline));
	Object.keys(pipeline).forEach(function(moduleKey){
		module = pipeline[moduleKey];
		module.jobs = module.jobs.map(function(job) {
			jobs[job]
		});
	});
	
	res.json(pipeline);
});

app.listen(3000);
console.log('Listening on port 3000');