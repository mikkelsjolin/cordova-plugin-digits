#!/usr/bin/env node

//
// This hook copies various resource files
// from our version control system directories
// into the appropriate platform specific location
//


var filestocopy = [{ "plugins/cordova-plugin-digits/src/android/style/styles.xml": "platforms/android/res/values/styles.xml" }];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile =  key;
        var destfile = val;
        console.log("- hook from  "+ srcfile +" to "+ destfile );
        var destdir = path.dirname(destfile);
        // create directory if not exists
        if (!fs.existsSync(destdir)){
            fs.mkdirSync(destdir);
        }
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
               fs.createWriteStream(destfile));
        }
    });
});
