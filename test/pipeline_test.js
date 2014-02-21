console.log('pipe line test start');
var Pipeline = require('../service/Pipeline.js');


// Pipeline.getData(nil,function(data){
// 	console.log(data);
// });

Pipeline.getData(new Date(2014,1,12),function(data){
	console.log(JSON.stringify(data));
});