var MongooseUtil = require('./MongooseUtil.js');
var conf = require('../config/config.prod.js');
var jenkins = require('./jenkins.js');

function recursiveModules(modules, jobs) {
    Object.keys(modules).forEach(function (moduleKey) {
        var module = modules[moduleKey];
        module.jobs = module.jobs.map(function (job) {
            return jobs[job];
        });
        if (!!module.submodules) {
            recursiveModules(module.submodules, jobs);
        }
    });
}

exports.getData = function (timestamp,callback) {
    if (timestamp) {
        //查询使用
        var onePipeline = MongooseUtil.findByDate(timestamp,function(e,data){
        	if(data.length > 0){
            	callback(JSON.parse(data[0].pipeline));
        	}
        });
    } else {
        //app.js和DailyBuild使用
        var jobs = JSON.parse(JSON.stringify(conf.jobs));
        var pipeline = JSON.parse(JSON.stringify(conf.pipeline));

        var length = Object.keys(conf.hosts).length;
        Object.keys(conf.hosts).forEach(function (key) {
            host = conf.hosts[key];
            jenkins.fetch(host, function (data) {
                length--;
                data.forEach(function (job) {
                    Object.keys(jobs).forEach(function (key2) {
                        job2 = jobs[key2];
                        if (job2.name == job.name && job2.host == key) {
                            jobs[key2] = job;
                            job.alias = job2.alias;
                        }
                    });
                });
                if (length == 0) {
                    recursiveModules(pipeline, jobs);
                    callback(pipeline);
                }
            });
        });
    }
}



