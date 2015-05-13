console.log("sduifiytrtu")

console.log(process.argv)

var buf = require('fs')
var hur =buf.readFileSync('test.txt')

var str=hur.toString()
console.log(str+'sss')
function callback (err,data){
	console.log(data);
};
console.log("------------------------")
// var hud = buf.readFile('test.txt',function(err,data){
// 	console.log(data.toString());
// 	console.log("testing");
// });

var hus = buf.readdir('./',function (err,list){
	console.log(list);
	console.log("sdfs");
});

