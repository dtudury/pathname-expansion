/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/17/13
 * Time: 12:22 PM
 */


var _ = require('lodash');
var expect = require('chai').expect;
var tokenizePaths = require('../lib/tokenizePaths');

console.log(tokenizePaths.globToRegex('a/(b?b)/c'));

describe('tokenizePaths', function () {
    it('should break path into directories', function () {
        expect(tokenizePaths(['a/b/c'])).to.deep.equal([[/^a$/, /^b$/, /^c$/]]);
    });
    it('should turn wildcards into regular expressions', function () {
        expect(tokenizePaths(['a/b?b/c'])).to.deep.equal([[/^a$/, /^b.b$/, /^c$/]]);
        expect(tokenizePaths(['a/b*b/c'])).to.deep.equal([[/^a$/, /^b.*b$/, /^c$/]]);
        expect(tokenizePaths(['a/b[a-z]b/c'])).to.deep.equal([[/^a$/, /^b[a-z]b$/, /^c$/]]);
        expect(tokenizePaths(['a/b[!z]b/c'])).to.deep.equal([[/^a$/, /^b[^z]b$/, /^c$/]]);
    });
    it('should remove any parens', function () {
        expect(tokenizePaths(['a/(b?b)/c'])).to.deep.equal([[/^a$/, /^b.b$/, /^c$/]]);
        expect(tokenizePaths(['(a/b*b)/c'])).to.deep.equal([[/^a$/, /^b.*b$/, /^c$/]]);
        expect(tokenizePaths(['a/(b[a-z])b/c'])).to.deep.equal([[/^a$/, /^b[a-z]b$/, /^c$/]]);
        expect(tokenizePaths(['a/b([!z]b/c)'])).to.deep.equal([[/^a$/, /^b[^z]b$/, /^c$/]]);
    });
});

describe('tokenizePaths.globToRegex', function () {
    it('should replace glob syntax with regex syntax', function () {
        expect(tokenizePaths.globToRegex('a/(b?b)/c')).to.deep.equal(/^a\/(b.b)\/c$/);
        expect(tokenizePaths.globToRegex('(a/b*b)/c')).to.deep.equal(/^(a\/b.*b)\/c$/);
        expect(tokenizePaths.globToRegex('a/(b[a-z])b/c')).to.deep.equal(/^a\/(b[a-z])b\/c$/);
        expect(tokenizePaths.globToRegex('a/b([!z]b/c)')).to.deep.equal(/^a\/b([^z]b\/c)$/);
    });
});
