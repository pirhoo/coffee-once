#!/usr/bin/env node

'use strict';

var coffeeOnce = require('./lib/coffee-once');

var userArgs = process.argv;
var searchParam = userArgs[2];

if(userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1 || searchParam === undefined) {
    return console.log('cli help');
}

if(userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
    return console.log(require('./package').version);
}

if(userArgs.length > 2) {
	var file = userArgs[userArgs.length-1];
	var args = process.argv.slice(2).join(" ");
	// Compile returns a promise
	coffeeOnce.compile(file,  args).then(function(stdout) {
		console.log(stdout);
	});
}
