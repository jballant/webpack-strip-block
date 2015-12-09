/*jslint node:true */
"use strict";

function StripBlockLoader(content) {

    this.startComment = 'develblock:start';
    this.endComment = 'develblock:end';

    this.regexPattern = new RegExp("[\\t ]*\\/\\* ?" + this.startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + this.endComment + " ?\\*\\/[\\t ]*\\n?", "g");

    content = content.replace(this.regexPattern, '');
    
    if (this.cacheable) {
        this.cacheable(true);
    }

    this.callback(null, content);
}

module.exports = StripBlockLoader;
