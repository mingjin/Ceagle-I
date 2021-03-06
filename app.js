var express = require('express'),
    cons = require('consolidate'),
    sass = require('node-sass'),
    conf = require('./config/config.prod.js'),
    jenkins = require('./service/jenkins.js'),
    mongoose_util = require('./service/MongooseUtil.js');
    
var app = express();

app.configure(function(){
    app.use(express.logger());
    app.use(express.compress());
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.static(__dirname + '/public'));
    app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.engine('html', cons.ejs);
    app.use(sass.middleware({
        src: __dirname + '/public/',
        dest: __dirname + '/public/',
        debug: true,
        outputStyle: 'compressed'
    }));
    app.use(function(req, res, next){
      console.log('%s %s', req.method, req.url);
      next();
    });
});

app.post('/q', function(req, res) {
	jenkins.fetch(req.body, function(data){
		res.json(data);
	});
});

function recursiveModules(modules, jobs) {
	Object.keys(modules).forEach(function(moduleKey) {
		module = modules[moduleKey];
		module.jobs = module.jobs.map(function(job) {
			return jobs[job];
		});
		if (!!module.submodules) {
			recursiveModules(module.submodules, jobs);
		}
	});
}

app.get('/qq', function(req, res) {
	jobs = JSON.parse(JSON.stringify(conf.jobs));
	pipeline = JSON.parse(JSON.stringify(conf.pipeline));
	
	var length = Object.keys(conf.hosts).length;
	Object.keys(conf.hosts).forEach(function(key){
		host = conf.hosts[key];
		jenkins.fetch(host, function(data) {
			length --;
			data.forEach(function(job){
				Object.keys(jobs).forEach(function(key2) {
					job2 = jobs[key2];
					if (job2.name == job.name && job2.host == key) {
						jobs[key2] = job;
					}
				});
			});
			if( length == 0) {
				recursiveModules(pipeline, jobs);
				res.json(pipeline);
			}
		});
	});
});

app.get('/pipelines', function(req, res) {
	var start = req.param("start");
	var end = req.param("end");
	if(start){
		start = start.split('-');
		start = new Date(start[0],start[1]-1,start[2]);
		if(end){
			end = end.split('-');
			end = new Date(end[0],end[1]-1,end[2]);
			mongoose_util.findBetweenDate(start,end,function(e,data){
				//这里只要获取有数据的日期就可以
				data=data.map(function(obj){return obj.lastTime});
				res.json(data);
			});
		}else{
			mongoose_util.findByDate(start,function(e,data){
				res.json(data);
			});
		}
	}
});


app.listen(3000);
console.log('Listening on port 3000');