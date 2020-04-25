const testCompiler = require('./test-compiler.js');
const assert = require('assert');

const EXPECTED_OUTPUT_BASIC_CASE = `
/* this comment should not be removed */
module.exports = function addOne(num) {
    const one = 1;
    return num + one;
}`

const EXPECTED_OUTPUT_CUSTOM_TAGS = `
const ONE_STR = 1;
/**
 * @returns {number} The number plus two
 */
const addTwo = (num = 0) => {
    // this comment should not be removed
    const one = parseInt(TWO_STR, 10);
    const numPlusOne = num + one;
    const numPlusTwo = numPlusOne + one;
    return numPlusTwo;
};

module.exports = addTwo;`

const EXPECTED_OUTPUT_INLINE = `function addThree(num) {
    const arr = '1 1 1'.split(' ');
    const three = arr.reduce((acc, el) => {
        return acc +parseInt(el, 10);
    }, 0);
    return num + three;
}

module.exports = addThree;
`

describe('webpack-strip-block', () => {
    describe('basic case', () => {
        it('removes the appropriate block and leaves other code unchanged', async () => {
            const stats = await testCompiler('fixtures/example-basic-case');
            const output = stats.toJson().modules[0].source;
            assert.equal(output, EXPECTED_OUTPUT_BASIC_CASE);
        });
    });

    describe('using custom tags', () => {
        it('removes the appropriate block and leaves other code unchanged', async () => {
            const stats = await testCompiler('fixtures/example-custom-tags', {
                options: {
                    start: 'webpack strip block - start',
                    end: 'webpack strip block - end'
                }
            });
            const output = stats.toJson().modules[0].source;
            assert.equal(output, EXPECTED_OUTPUT_CUSTOM_TAGS);
        });
    });

    describe('using inline blocks', () => {
        it('removes the appropriate block and leaves other code unchanged', async () => {
            const stats = await testCompiler('fixtures/example-inline', {
                options: {
                    start: 'DEV:START',
                    end: 'DEV:END'
                }
            });
            const output = stats.toJson().modules[0].source;
            assert.equal(output, EXPECTED_OUTPUT_INLINE);
        });
    });
});