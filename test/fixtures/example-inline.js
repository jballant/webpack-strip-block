function addThree(num) {
    const arr = '1 1 1'.split(' ');
    const three = arr.reduce((acc, el) => {
        return acc + /* DEV:START */ 0 + /* DEV:END */ parseInt(el, 10);
    }, 0);
    return num + three;
}

module.exports = addThree;
