/*jslint continue:true*/

module.exports = function (callback) {
    'use strict';

    var webscraper = require('webscraper');

    var helpers = {
        clean: function (text) {
            return text.replace('&amp;', '&').replace('&nbsp;', '').trim();
        }
    };

    webscraper('http://tanzil.net/trans/', function (err, $) {

        // Check for errors
        if (err) {
            callback(new Error('Unable to scrape Tanzil page!'), null);
            return;
        }

        // Read Translation table
        var rows = $('.transList:first-of-type tr');

        // Validate result before parsing
        if (rows.length === 0) {
            callback(new Error('Unable to find any data!'), null);
            return;
        }

        // Prepare result list
        var list = [];

        // Start parsing result
        var idx, i;
        for (idx = 0; idx < rows.length; idx = idx + 1) {
            // Bypass first column
            if (idx === 0) { continue; }

            // Get fields data
            var fields = $(rows[idx]).find('td');

            // Validate fields
            if (fields.length !== 4) {
                callback(new Error('Invalid fields count for record #' + idx), null);
                return;
            }

            // Parse field data
            var trans = {};

            try {
                // Fields
                if (fields[0].children.length > 0) {
                    trans.CountryCode = fields[0].children[0].attribs.src.match('.*/(.*)\.png')[1];
                    trans.Language = helpers.clean(fields[0].children[1].data);
                }
                trans.Name = helpers.clean(fields[1].children[0].data);
                trans.Translator = helpers.clean(fields[2].children[0].data);
                if (fields[2].children.length > 1) {
                    trans.Biography = decodeURIComponent(helpers.clean(fields[2].children[1].attribs.href).replace('http://tanzil.net/pub/url/?q=',''));
                }
                trans.ID = helpers.clean(fields[3].children[0].attribs.href.match('.*/(.*)$')[1]);

                // Calculated Fields
                trans.Download = 'http://tanzil.net/trans/' + trans.ID;
                trans.ChangeLog = 'http://tanzil.ca/trans/log/' + trans.ID;

                // Save result in list
                list.push(trans);
            } catch (e) {
                callback(new Error('Unable to parse record #' + idx + ' - ' + e), null);
                return;
            }
        }

        // Return result
        callback(null, list);
    });
};
