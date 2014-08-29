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
	return console.log( coffeeOnce.compile(userArgs[userArgs.length-1], process.argv.slice(2).join(" ") ) );
}
