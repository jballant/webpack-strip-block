function ifdef(num) {
    //DEV:START
    const arr = '1 1 1'.split(' ');
    const three = arr.reduce((acc, el) => {
        return 1;
    }, 0);
    //DEV:END
    return num + three;
}

module.exports = ifdef;
