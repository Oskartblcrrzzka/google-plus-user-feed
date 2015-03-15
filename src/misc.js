'use strict';

var jsdom = require('jsdom');

exports.cut = function(string, length) {
    if (string.length > length) string = string.slice(0, length - 2) + '…';
    return string;
};

exports.htmlToPlain = function(html) {
    var document = jsdom.jsdom('<html>' + html + '</html>');

    // Add line breaks for block elements
    ['br', 'div', 'p'].forEach(function(tag) {
        var elements = document.getElementsByTagName(tag);
        for (var i = 0; i < elements.length; i++) {
            var newline = document.createTextNode('\n');
            elements[i].parentNode.insertBefore(newline, elements[i]);
        }
    });

    return document.documentElement.textContent;
};
