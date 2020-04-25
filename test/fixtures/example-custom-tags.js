
const ONE_STR = 1;
/**
 * @returns {number} The number plus two
 */
const addTwo = (num = 0) => {
    // this comment should not be removed
    const one = parseInt(TWO_STR, 10);
    /* webpack strip block - start */
    console.log('Adding one to the input');
    /* webpack strip block - end */
    const numPlusOne = num + one;
    /* webpack strip block - start */
    console.log(
        'Adding one to the input again'
    );
    /* webpack strip block - end */
    const numPlusTwo = numPlusOne + one;
    return numPlusTwo;
};

module.exports = addTwo;