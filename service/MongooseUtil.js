var mongoose = require("mongoose");

var schema_jobStatus = mongoose.Schema({
    lastTime: Date,
    pipeline: String
});
//这里我们采用大写类名的方式
var JobStatus = mongoose.model('jobStatus', schema_jobStatus);
var db = null;

function connect(){
	mongoose.connect('mongodb://127.0.0.1/database');
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
}

function close(){
	db.close();
}

function findByDate(date_start,date_end, callback){
	connect();	
	console.log(date_start);
	console.log(date_end);
	date_end = new Date(+date_end+24*60*60*1000);
	JobStatus.find({ lastTime: { $gte: date_start,$lt:date_end } })
		//.select('lastTime')
		.exec(function(e,obj){
			callback(e,obj);
    		close();
    });
}

exports.createRecord = function (lastTime, pipeline,callback){
	connect();
    new JobStatus({
        lastTime: lastTime,
        pipeline: pipeline
    }).save(function(e,obj){callback(e,obj);
    	close();
    });
}

exports.deleteAll = function(callback){
	connect();	
	JobStatus.remove(function(e,obj){
		callback(e,obj);
    	close();
    });
} 

exports.findAll = function (callback) {
	connect();	
	JobStatus.find().exec(function(e,obj){callback(e,obj);
    	close();
    });
}


exports.findByDate = function (date, callback) {
	findByDate(date,date, callback);
}

exports.findBetweenDate = function (date_start,date_end, callback){
	findByDate(date_start,date_end, callback);
}


