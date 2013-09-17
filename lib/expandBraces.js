/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 9/16/13
 * Time: 8:57 PM
 */

var _ = require('lodash');


module.exports = function expandBraces(expression) {
    var expansions = _.uniq(_insideOut(expression));
    for(var i = 0; i < expansions.length; i++) {
        expansions[i] = expansions[i].replace(/\\}/g, '}');
        expansions[i] = expansions[i].replace(/\\{/g, '{');
    }
    return expansions;
};

function _insideOut(expression) {
    var innerBraces = _getInnerBraces(expression);
    if(!innerBraces) return [expression];
    var choices = expression.substring(innerBraces[0] + 1, innerBraces[1]).split(',');
    return _.reduce(choices, function (expansions, choice) {
        return expansions.concat(_insideOut(expression.substring(0, innerBraces[0]) + choice + expression.substring(innerBraces[1] + 1)));
    }, []);
}

function _getInnerBraces(expression) {
    var escaped = false;
    var innerBraces;
    for(var i = 0; i < expression.length; i++) {
        var char = expression.charAt(i);
        if(char === '\\') escaped = true;
        else if (!escaped) {
            if(char === '{') innerBraces = [i];
            else if(char === '}') {
                if(!innerBraces) throw new Error('unmatched brace');
                innerBraces.push(i);
            }
        } else escaped = false;
    }
    if(innerBraces && innerBraces.length === 1) throw new Error('unmatched brace');
    return innerBraces;
}

