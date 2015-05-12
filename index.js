/**
 * Export Web Scraper Module
 */

'use strict';

module.exports = {

    // Timezone Source
    scraper: require('./lib/scraper'),
    exporter: require('./lib/exporter'),

    // Version
    version: require('./package').version

};
