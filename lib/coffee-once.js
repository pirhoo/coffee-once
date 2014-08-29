/*
 *
 * http://github.com/pirhoo/coffee-once
 *
 * Copyright (c) 2014 Pierre Romera
 * Licensed under the MIT license.
 */
// Constants
var TMP_DIR = "/tmp/coffee-once";
// Libs
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var coffee = require('coffee-script');
var execSync = require('exec-sync');

// Get hash for the given file
exports.getFileHash = function(file) {
    // Create the hash helper
    var hash = crypto.createHash('sha1');
    hash.setEncoding('hex');
    // Read the file and put it to the hash
    hash.write( fs.readFileSync(file).toString() )
    hash.end();
    // Return the hash
    return hash.read()
};

// Purge the tmp directory
exports.purge = function() {
    try {
        var files = fs.readdirSync(TMP_DIR);
    }
    // Fail silently
    catch(e) { return; }
    // Does the directory contains files or directory?
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var filePath = path.join(TMP_DIR, files[i]);
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                exports.purge(filePath);
        }
    }
    fs.rmdirSync(TMP_DIR);
};

// Get or compile the given file
exports.compile = function(filename, args) {
    // Creates the temporary dir
    if( !fs.existsSync(TMP_DIR) ) fs.mkdirSync(TMP_DIR);
    // Get the hash of this file
    var fileHash = exports.getFileHash(filename);
    // Get the path of its temporary file
    var tmpFilePath = path.join(TMP_DIR, fileHash);
    // Does the tmp file exists?
    if( fs.existsSync(tmpFilePath) ) {
        // Print it out!
        return fs.readFileSync(tmpFilePath).toString();
    // Any temporary version exists
    } else {
        var cmd = "./node_modules/coffee-script/bin/coffee";
        // Add command arguments
        cmd += " --compile --print "
        cmd += args
        // Execute coffee parser
        var content = execSync(cmd);
        fs.writeFileSync(tmpFilePath, content);
        return content;
    }
};
