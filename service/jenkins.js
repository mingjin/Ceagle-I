var rest = require('./rest.js')

exports.fetch = function(hostConf, onComplete) {
	var options = {
		host: hostConf['host'],
		port: hostConf['port'] || '80',
		path: (hostConf['context'] || '') + '/api/json?tree=jobs[name,buildable,healthReport[score],lastBuild[result,building,url]]',
		method: 'get'
	};
	if(!!hostConf['username'] && !!hostConf['password']) {
		options.headers = { 'Authorization': 'Basic '+ new Buffer(hostConf['username']+':'+hostConf['password']).toString('base64') };
	}
    rest.get(options, function(status, result){
        var activeJobs = result.jobs.filter(function(job) {
            return job.buildable && job.lastBuild;
        });
        onComplete(activeJobs);
    });
}