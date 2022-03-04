'use strict';
const FileParser = require('./helpers/parser').FileParser;
const { response } = require('express');
const request = require('./helpers/request')

// Process data files
async function processData(fileName) {
    try {
        if (fileName) {
            let parser = new FileParser(fileName);
            let blobs = parser.parseTxt();
            let options = {
                host: "2swdepm0wa.execute-api.us-east-1.amazonaws.com",
                path: "/prod/NavaInterview/measures",
                headers: {
                    "Content-Type": "application/json"
                }
            };

            for (let blob of blobs) {
                await request.post(options, JSON.stringify(blob));
            }
            
            return { status: "All blobs processed" };

        } else {
            return { status: "No file name" };
        }
    } catch (e) {
        throw { error: e.message };
    }
}

module.exports = {
    processData
}