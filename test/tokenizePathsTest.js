/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/17/13
 * Time: 12:22 PM
 */


var _ = require('lodash');
var expect = require('chai').expect;
var tokenizePaths = require('../lib/tokenizePaths');

describe('tokenizePaths', function () {
    it('should break path into directories', function () {
        expect(tokenizePaths(['a/b/c'])).to.deep.equal([['a', 'b', 'c']]);
    });
});
