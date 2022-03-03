'use strict';
const FileParser = require('./helpers/parser').FileParser;

// Process data files
function processData() {
    let parser = new FileParser("booleanmeasures");
    parser.parseTxt()
    // parser.parseCsv();
}

module.exports = {
    processData
}