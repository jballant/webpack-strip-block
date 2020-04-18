/*jslint node:true */
'use strict';

var loaderUtils = require('loader-utils');

function regexEscape(str) {
    return str.replace(/([\^|\$|\.|\*|\+|\?|\=|\!|\:|\\|\/|\(|\)|\[|\]|\{|\}])/gi, '\\$1');
}

function StripBlockLoader(content) {
    var options = loaderUtils.getOptions(this);
    if (options && options.blocks) {
        var start = Array.isArray(options.start) ? options.start : [options.start];
        var end = Array.isArray(options.end) ? options.end : [options.end];
        for(var i = 0; i < start.length; i++)
        {
            var starti = regexEscape(start[i] || '/*');
            var endi = regexEscape(end[i] || '/*');
            options.blocks.forEach(function (block) {
                var regex = new RegExp('[\\t ]*' + starti + ' ?(' + block + '):start ?' + endi + '[\\s\\S]*?' + starti + ' ?\\1:end ?' + endi + '[\\t ]*\\n?', 'g');
                content = content.replace(regex, '');
            });
        }
    }

    if (this.cacheable) {
        this.cacheable(true);
    }

    return content;
}

module.exports = StripBlockLoader;
