# Web Scraper for Tanzil.net

Collect following data sources from Tanzil.net:

- translations
	- Source: [Quran Translations](http://tanzil.net/trans/)
	- Fields:
        - ID
        - CountryCode
        - Language
        - Name
        - Translator
        - Biography
        - Download
        - ChangeLog

Module provide following sections for each data source:

- `scraper`: Scraper is responsible to parse source page from Tanzil and provide result in callback.
- `exporter`: Exporter will use scraper to collect data and expose different export as JSON.

## Installation

Install using [npm](http://github.com/isaacs/npm):

    $ npm install webscraper-tanzil

## Data

Generated data are located in `./data/` folder. To refresh data use following command:

```bash
$ node -e "require('./index.js').exporter.generate()"
```
