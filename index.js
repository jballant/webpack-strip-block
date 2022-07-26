/*jslint node:true */
"use strict";

var projectName = require("./package.json").name;
var loaderUtils = require("loader-utils");
var regexCharsRegex = /[-[\]{}()*+?.,\\^$\/|#]/g;

function escapeRegexChars(comment) {
    return comment && regexCharsRegex.test(comment)
        ? comment.replace(regexCharsRegex, '\\$&')
        : comment;
}

function StripBlockLoader(content) {
    var options = loaderUtils.getOptions(this) || {};
    var startComment = options.start || 'develblock:start';
    var endComment = options.end || 'develblock:end';
    var removeOuterWhitespace = options.removeOuterWhitespace === true;
    var omitReplacementMarker = options.omitReplacementMarker === true;
    var startWhitespaceMatcher = "";
    var endWhitespaceMatcher = "";
    var whitespaceMatcher = "[\\t ]*";

    // in case there are any regex chars in the comment string itself
    startComment = escapeRegexChars(startComment);
    endComment = escapeRegexChars(endComment);

    // if removeOuterWhitespace is true, remove whitespace on
    // the line outside of the comment tags to start and end
    // the dev block
    if (removeOuterWhitespace) {
        startWhitespaceMatcher = "^" + whitespaceMatcher;
        endWhitespaceMatcher = whitespaceMatcher + "\\n?"
    }
    var regexPatternBlock = new RegExp(startWhitespaceMatcher +
        "\\/\\* ?" + startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" +
        endComment + " ?\\*\\/" + endWhitespaceMatcher, "g");
    var regexPatternInline = new RegExp(startWhitespaceMatcher +
        "\\/\\/" + startComment + "\n[\\s\\S]*?\/\/" +
        endComment + endWhitespaceMatcher, "g");

    // format the replacement comment str, but omit the replacement
    // comment entirely if empty string is passed in as the value
    // for the 'replacementText' option
    var replacement = (typeof options.replacementText === 'string')
        ? escapeRegexChars(options.replacementText)
        : (omitReplacementMarker ? '' : (projectName + ':removed'));
    replacement = (!!replacement)
        ? ('/* ' + replacement + ' */')
        : '';
    if (regexPatternBlock.test(content)) {
        content = content.replace(regexPatternBlock, replacement);
    } else if (regexPatternInline.test(content)) {
        content = content.replace(regexPatternInline, replacement);
    }

    if (this.cacheable) {
        this.cacheable(true);
    }

    return content;
}

module.exports = StripBlockLoader;
