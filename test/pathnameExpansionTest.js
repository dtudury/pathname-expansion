/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 9/18/13
 * Time: 10:43 PM
 */


var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Q = require('q');

var readdir = Q.denodeify(fs.readdir);
var lstat = Q.denodeify(fs.lstat);


var t = +new Date();

recurse('/Users/dtudury')
    .then(function(stuff) {
        console.log(JSON.stringify(stuff, void 0, 4));
        var dt = new Date(+new Date() - t);
        console.log([dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds()].join(':'));
    })
    .done();


function recurse(root) {
//    console.log('root:', root);
    return readdir(root)
        .then(function (files) {
//            console.log(files);
            return Q.all(_.map(files, function (file) {
                file = path.join(root, file);
                return lstat(file)
                    .then(function (stats) {
                        if (stats.isDirectory()) {
                            return recurse(file);
                        }
                        return file;
                    }, function(error) {
                        console.log(error);
                    });
            }))
        }, function(error) {
            console.log(error);
        })
}

