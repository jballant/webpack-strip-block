/*jslint node:true */
'use strict';

var loaderUtils = require('loader-utils');

function regexEscape(str) {
    return str.replace(/([\^|\$|\.|\*|\+|\?|\=|\!|\:|\\|\/|\(|\)|\[|\]|\{|\}])/gi, '\\$1');
}

function StripBlockLoader(content) {
    var options = loaderUtils.getOptions(this);
    if (options && options.blocks) {
        var start = regexEscape(options.start || '/*');
        var end = regexEscape(options.end || '/*');
        options.blocks.forEach(function (block) {
            var regex = new RegExp('[\\t ]*' + start + ' ?(' + block + '):start ?' + end + '[\\s\\S]*?' + start + ' ?\\1:end ?' + end + '[\\t ]*\\n?', 'g');
            content = content.replace(regex, '');
        });
    }

    if (this.cacheable) {
        this.cacheable(true);
    }

    return content;
}

module.exports = StripBlockLoader;