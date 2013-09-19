/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/17/13
 * Time: 12:32 PM
 */


var _ = require('lodash');


module.exports = tokenizePaths;
module.exports.globToRegex = globToRegex;

function tokenizePaths(paths) {
    if(_.isString(paths)) paths = [paths];
    paths = paths.slice();
    for(var i = 0; i < paths.length; i++) {
        if(paths[i] === '**') return paths; //from here on all paths must be searched
        paths[i] = _tokenizePath(paths[i]);
    }
    return paths;
};

function globToRegex(string) {
    string = string.replace(/\//g, '\\\/');
    string = string.replace(/\./g, '\.');
    string = string.replace(/\?/g, '.');
    string = string.replace(/\*/g, '.*');
    string = string.replace(/\[!([^\]]*)\]/g, '[^$1]');
    return new RegExp('^' + string + '$');
}

function _tokenizePath(path) {
    return _.map(path.split('/'), function(dir) {
        return  _tokenizeDir(dir)
    })
}

function _tokenizeDir(dir) {
    dir = dir.replace(/[()]/g, ''); //ignore parens for now
    if(~dir.search(/[*\[?]/)) return globToRegex(dir);
    return new RegExp('^' + dir + '$');
}