/*jslint node:true */
"use strict";

function StripBlockLoader(content) {

    var startComment = 'develblock:start';
    var endComment = 'develblock:end';

    var regexPattern = new RegExp("[\\t ]*\\/\\* ?" + startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + endComment + " ?\\*\\/[\\t ]*\\n?", "g");

    content = content.replace(regexPattern, '');

    if (this.cacheable) {
        this.cacheable(true);
    }

    return content;
}

module.exports = StripBlockLoader;
