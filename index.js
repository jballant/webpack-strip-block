/*jslint node:true */
"use strict";

var loaderUtils = require("loader-utils");

function StripBlockLoader(content) {
    var query = loaderUtils.parseQuery(this.query);
    var startComment = query.start || 'develblock:start';
    var endComment = query.end || 'develblock:end';

    var regexPattern = new RegExp("[\\t ]*\\/\\* ?" + startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + endComment + " ?\\*\\/[\\t ]*\\n?", "g");

    content = content.replace(regexPattern, '');

    if (this.cacheable) {
        this.cacheable(true);
    }

    return content;
}

module.exports = StripBlockLoader;
