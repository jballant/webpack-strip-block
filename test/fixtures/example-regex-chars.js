class TestRegexChars {
    usingDot() {
        /* DEV.START */ console.log('should vanish'); /* DEV.END */
        return 1 + /* DEV.START */ 0 + /* DEV.END */ 1;
    }
    usingPlus() {
        /* DEV+START */ console.log('should vanish'); /* DEV+END */
        return 1 + /* DEV+START */ 0 + /* DEV+END */ 1;
    }
    usingBackslash() {
        /* DEV\START */ console.log('should vanish'); /* DEV\END */
        return 1 + /* DEV\START */ 0 + /* DEV\END */ 1;
    }
    usingDollarSign() {
        /* DEV$START */ console.log('should vanish'); /* DEV$END */
        return 1 + /* DEV$START */ 0 + /* DEV$END */ 1;
    }
}