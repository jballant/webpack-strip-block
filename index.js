/*jslint node:true */
"use strict";

function StripBlockLoader(content) {
    var options = {};
    this.startComment = options.startComment || 'develblock:start';
    this.endComment = options.endComment || 'develblock:end';

    this.regexPattern = new RegExp("[\\t ]*\\/\\* ?" + this.startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + this.endComment + " ?\\*\\/[\\t ]*\\n?", "g");

    content = content.replace(this.regexPattern, '');

    this.callback(null, content);
}

module.exports = StripBlockLoader;