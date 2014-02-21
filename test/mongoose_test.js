console.log('mongoose_test start');
var MongooseUtil = require('../service/MongooseUtil.js');


function test_insert(){
	var pipeline1 = {"gut":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":true,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}],"submodules":{"ems":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":true,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}],"submodules":{"north":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}]},"app":{"jobs":[{"name":"jruby-launcher","buildable":true,"healthReport":[{"score":100}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-launcher/939/"}}]}}}}}} ;
	var pipeline2 = {"gut":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":false,"result":"FAILED","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}],"submodules":{"ems":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}],"submodules":{"north":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}]},"app":{"jobs":[{"name":"jruby-launcher","buildable":true,"healthReport":[{"score":100}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-launcher/939/"}}]}}}}}} ;
	var pipeline3 = {"gut":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}],"submodules":{"ems":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":false,"result":"FAILED","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}],"submodules":{"north":{"jobs":[{"name":"jruby-rack-dist","buildable":true,"healthReport":[{"score":60}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-rack-dist/1038/"}}]},"app":{"jobs":[{"name":"jruby-launcher","buildable":true,"healthReport":[{"score":100}],"lastBuild":{"building":false,"result":"SUCCESS","url":"http://ci.jruby.org/job/jruby-launcher/939/"}}]}}}}}} ;

	MongooseUtil.createRecord(new Date(2014,1,11),JSON.stringify(pipeline1));
	MongooseUtil.createRecord(new Date(2014,1,12),JSON.stringify(pipeline2));
	MongooseUtil.createRecord(new Date(2014,1,13),JSON.stringify(pipeline3));
}

function print(e,data){
	data.forEach(function(obj){
		console.log(obj);
	});
}

function test_find(){
//MongooseUtil.findAll(print);
	var date_start = new Date(2014,1,12);
	var date_end = new Date(2014,1,14);
	MongooseUtil.findByDate(date_start,print)
	// MongooseUtil.findBetweenDate(date_start,date_end,print);
}
//MongooseUtil.deleteAll();
//test_insert();
test_find();