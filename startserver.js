spawn = require('child_process').spawn;

ts = spawn('tsc',['-w'],{
	stdio:'inherit'
});
php = spawn('sudo',['php','-S','localhost:80'],{
	stdio:'inherit'
});