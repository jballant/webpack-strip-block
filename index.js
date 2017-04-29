/*jslint node:true */
"use strict";

var loaderUtils = require("loader-utils");

function StripBlockLoader(content) {
    var options = loaderUtils.getOptions(this) || {};
    var startComment = options.start || 'develblock:start';
    var endComment = options.end || 'develblock:end';

    var regexPattern = new RegExp("[\\t ]*\\/\\* ?" + startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + endComment + " ?\\*\\/[\\t ]*\\n?", "g");

    content = content.replace(regexPattern, '');

    if (this.cacheable) {
        this.cacheable(true);
    }

    return content;
}

module.exports = StripBlockLoader;
