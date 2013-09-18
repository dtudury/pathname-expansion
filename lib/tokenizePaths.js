/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/17/13
 * Time: 12:32 PM
 */


var _ = require('lodash');


module.exports = function tokenizePaths(paths) {
    if(_.isString(paths)) paths = [paths];
    paths = paths.slice();
    for(var i = 0; i < paths.length; i++) {
        paths[i] = _tokenizePath(paths[i]);
    }
    return paths;
};

function _tokenizePath(path) {
    var roughPass = path.split('/');
    var output = [];
    for(var i = 0; i < roughPass.length; i++) {
        var token = _tokenizeDir(roughPass[i]);
        output.push(token);
    }
    return output;
}

function _tokenizeDir(dir) {
    if(~dir.search(/[*\[\]?]/)) {
        dir = dir.replace(/\./g, '\.');
        dir = dir.replace(/\?/g, '.');
        dir = new RegExp('^' + dir + '$');
    }
    return dir;
}