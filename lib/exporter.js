
module.exports = (function () {
    'use strict';

    // Module dependencies
    var fs = require('fs'),
        scraper = require('./scraper');

    // Save to JSON
    var saveAsJSON = function (filename, options, callback) {

        // If no options passed in
        if (typeof options === 'function') { callback = options; options = {}; }

        // Check for undefined parameters
        if (typeof callback !== 'function') { callback = function () {}; }
        if (options === undefined || options.constructor !== Object) { options = {}; }

        // Set default values for options
        if (options.space === undefined) { options.space = 0; }

        scraper(function (err, result) {

            // Check for errors
            if (err) {
                callback(err, null);
                return;
            }

            // Save as JSON
            fs.writeFile(
                filename,
                JSON.stringify(result, null, options.space),
                function (err) {

                    // Check for errors
                    if (err) {
                        callback(err, null);
                        return;
                    }

                    callback(null, result.length);
                }
            );
        });
    };

    var generate = function () {
        var jsonOptions = {
            space: 4
        };

        saveAsJSON('data/trans.json', jsonOptions, function (err, count) {
            if (err) {
                console.log('Error in generating trans.json: ' + err);
            } else {
                console.log(count + ' records saved in JSON file.');
            }
        });
    }

    return {
        saveAsJSON: saveAsJSON,
        generate: generate
    };
}());
