/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 9/16/13
 * Time: 8:21 PM
 */


var _ = require('lodash');
var expect = require('chai').expect;
var expandBraces = require('../lib/expandBraces');

describe('expandBraces', function () {
    it('should leave strings without braces alone', function () {
        expect(expandBraces('abcd')).to.deep.equal(['abcd']);
    });
    it('should expand strings with braces', function () {
        expect(expandBraces('a{b,c,d}e{f,g}').sort()).to.deep.equal(['abef', 'abeg', 'acef', 'aceg', 'adef', 'adeg']);
    });
    it('should expand strings with nested braces', function () {
        expect(expandBraces('a{b,{c,g}f,d}e').sort()).to.deep.equal(['abe', 'acfe', 'ade', 'agfe']);
    });
    it('should leave strings with escaped braces alone', function () {
        expect(expandBraces('\\}a\\{b,c,d\\}e\\{').sort()).to.deep.equal(['}a{b,c,d}e{']);
    });
});


