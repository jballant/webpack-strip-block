const testCompiler = require('./test-compiler.js');
const assert = require('assert');

const EXPECTED_OUTPUT_BASIC_CASE = `
/* this comment should not be removed */
module.exports = function addOne(num) {
    const one = 1;
    /* webpack-strip-block:removed */
    return num + one;
}`;

const EXPECTED_OUTPUT_CUSTOM_TAGS = `
const ONE_STR = 1;
/**
 * @returns {number} The number plus two
 */
const addTwo = (num = 0) => {
    // this comment should not be removed
    const one = parseInt(TWO_STR, 10);
    /* webpack-strip-block:removed */
    const numPlusOne = num + one;
    /* webpack-strip-block:removed */
    const numPlusTwo = numPlusOne + one;
    return numPlusTwo;
};

module.exports = addTwo;`;

const EXPECTED_OUTPUT_INLINE = `function addThree(num) {
    const arr = '1 1 1'.split(' ');
    const three = arr.reduce((acc, el) => {
        return acc + /* webpack-strip-block:removed */ parseInt(el, 10);
    }, 0);
    return num + three;
}

module.exports = addThree;
`;

const EXPECTED_OUTPUT_INLINE_REGEX_CHARS_1 = `class TestRegexChars {
    usingDot() {
        /* webpack-strip-block:removed */
        return 1 + /* webpack-strip-block:removed */ 1;
    }
    usingPlus() {
        /* DEV+START */ console.log('should vanish'); /* DEV+END */
        return 1 + /* DEV+START */ 0 + /* DEV+END */ 1;
    }
    usingBackslash() {
        /* DEV\\START */ console.log('should vanish'); /* DEV\\END */
        return 1 + /* DEV\\START */ 0 + /* DEV\\END */ 1;
    }
    usingDollarSign() {
        /* DEV$START */ console.log('should vanish'); /* DEV$END */
        return 1 + /* DEV$START */ 0 + /* DEV$END */ 1;
    }
}`;

const EXPECTED_OUTPUT_INLINE_REGEX_CHARS_2 = `class TestRegexChars {
    usingDot() {
        /* DEV.START */ console.log('should vanish'); /* DEV.END */
        return 1 + /* DEV.START */ 0 + /* DEV.END */ 1;
    }
    usingPlus() {
        /* webpack-strip-block:removed */
        return 1 + /* webpack-strip-block:removed */ 1;
    }
    usingBackslash() {
        /* DEV\\START */ console.log('should vanish'); /* DEV\\END */
        return 1 + /* DEV\\START */ 0 + /* DEV\\END */ 1;
    }
    usingDollarSign() {
        /* DEV$START */ console.log('should vanish'); /* DEV$END */
        return 1 + /* DEV$START */ 0 + /* DEV$END */ 1;
    }
}`;

const EXPECTED_OUTPUT_INLINE_REGEX_CHARS_3 = `class TestRegexChars {
    usingDot() {
        /* DEV.START */ console.log('should vanish'); /* DEV.END */
        return 1 + /* DEV.START */ 0 + /* DEV.END */ 1;
    }
    usingPlus() {
        /* DEV+START */ console.log('should vanish'); /* DEV+END */
        return 1 + /* DEV+START */ 0 + /* DEV+END */ 1;
    }
    usingBackslash() {
        /* webpack-strip-block:removed */
        return 1 + /* webpack-strip-block:removed */ 1;
    }
    usingDollarSign() {
        /* DEV$START */ console.log('should vanish'); /* DEV$END */
        return 1 + /* DEV$START */ 0 + /* DEV$END */ 1;
    }
}`;

const EXPECTED_OUTPUT_NO_OUTER_WHITESPACE = `const  addFour = (num) => ('   '.length + /* DEV:START */ 0 + /* DEV:END */ num);

module.exports = addFour;
`;

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
        describe('using regex chars in tags', () => {
            const runUsingDevblockWith = async (char) => {
                const stats = await testCompiler('fixtures/example-regex-chars', {
                    options: {
                        start: `DEV${char}START`,
                        end: `DEV${char}END`
                    }
                });
                return stats.toJson().modules[0].source;
            };
            it('removes the appropriate block and leaves other code unchanged', async () => {
                let output = await runUsingDevblockWith('.');
                assert.equal(output, EXPECTED_OUTPUT_INLINE_REGEX_CHARS_1);
                output = await runUsingDevblockWith('+');
                assert.equal(output, EXPECTED_OUTPUT_INLINE_REGEX_CHARS_2);
                output = await runUsingDevblockWith('\\');
                assert.equal(output, EXPECTED_OUTPUT_INLINE_REGEX_CHARS_3);
                output = await runUsingDevblockWith('$');
            });
        })
    });

    describe('removing outer whitespace', () => {
        it('removes the appropriate block and leaves other code unchanged', async () => {
            const stats = await testCompiler('fixtures/example-no-outer-whitespace', {
                options: {
                    start: 'DEV:START',
                    end: 'DEV:END',
                    removeOuterWhitespace: true
                }
            });
            const output = stats.toJson().modules[0].source;
            assert.equal(output, EXPECTED_OUTPUT_NO_OUTER_WHITESPACE);
        });
    });
});