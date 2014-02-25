var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/database');
var schema_jobStatus = mongoose.Schema({
    lastTime: Date,
    pipeline: String
});
//这里我们采用大写类名的方式
var JobStatus = mongoose.model('jobStatus', schema_jobStatus);


function connect(){
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	return db;
}

function close(db){
	db.close();
}

function findByDate(date_start,date_end, callback){
	var db = connect();
	console.log(date_start);
	console.log(date_end);
	date_end = new Date(+date_end+24*60*60*1000);
	JobStatus.find({ lastTime: { $gte: date_start,$lt:date_end } })
		//.select('lastTime')
		.exec(function(e,obj){
			callback(e,obj);
    		close(db);
    });
}

exports.createRecord = function (lastTime, pipeline,callback){
	var db = connect();
    new JobStatus({
        lastTime: lastTime,
        pipeline: pipeline
    }).save(function(e,obj){
    	if(callback)callback(e,obj);
    	close(db);
    });
}

exports.deleteAll = function(callback){
	var db = connect();
	JobStatus.remove(function(e,obj){
		if(callback)callback(e,obj);
    	close(db);
    });
} 

exports.findAll = function (callback) {
	var db = connect();
	JobStatus.find().exec(function(e,obj){callback(e,obj);
    	close(db);
    });
}


exports.findByDate = function (date, callback) {
	findByDate(date,date, callback);
}

exports.findBetweenDate = function (date_start,date_end, callback){
	findByDate(date_start,date_end, callback);
}


