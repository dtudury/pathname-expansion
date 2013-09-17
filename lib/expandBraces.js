/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 9/16/13
 * Time: 8:57 PM
 */

var _ = require('lodash');


module.exports = function expandBraces(expressions) {
    if(_.isString(expressions)) expressions = [expressions];
    var expansions = _.uniq(_.reduce(expressions, function(expansions, expression) {
        return expansions.concat(_insideOut(expression));
    }, []));
    for(var i = 0; i < expansions.length; i++) {
        expansions[i] = expansions[i].replace(/\\}/g, '}');
        expansions[i] = expansions[i].replace(/\\{/g, '{');
    }
    return expansions;
};

function _insideOut(expression) {
    var innerBraces = _getInnerBraces(expression);
    if(!innerBraces.length) return [expression];
    var choices = expression.substring(innerBraces[0] + 1, innerBraces[1]).split(',');
    return _.reduce(choices, function (expansions, choice) {
        return expansions.concat(_insideOut(expression.substring(0, innerBraces[0]) + choice + expression.substring(innerBraces[1] + 1)));
    }, []);
}

function _getInnerBraces(expression) {
    var escaped = false;
    var innerBraces = [];
    for(var i = 0; i < expression.length; i++) {
        var c = expression.charAt(i);
        if(c === '\\') escaped = true;
        else if (!escaped) {
            if(c === '{') innerBraces = [i];
            else if(c === '}') {
                if(!innerBraces.length) throw new Error('unmatched brace');
                innerBraces.push(i);
            }
        } else escaped = false;
    }
    if(innerBraces && innerBraces.length === 1) throw new Error('unmatched brace');
    return innerBraces;
}

