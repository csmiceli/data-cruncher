'use strict';
const fs = require("fs");

class FileParser {
    constructor(name) {
        this.txt = `./data/${name}.txt`;
        this.csv = `./schemas/${name}.csv`;
    }

    // Parse data file
    parseTxt() {
        if (!fs.existsSync(this.txt)) throw new Error("File does not exist");

        let fileText = fs.readFileSync(this.txt, "UTF8").split("\r\n");
        let schema = this.#parseCsv();
        let blobs = [];        
      

        for (let row of fileText) {
            let blob = {};
            let count = 0;

            for (let i = 0; i < schema.length; i++) {
                let field = schema[i][0];
                let size = parseInt(schema[i][1]);
                let type = schema[i][2];
                let value = this.#cast(row.substring(count, count + size), type);                

                blob[field] = value;                
                count += size;
            }

            blobs.push(blob);
        }

        return blobs;
    }

    // Parse schema file
    #parseCsv() {
        let fileCsv = fs.readFileSync(this.csv, "UTF8").split("\r\n");

        for (let i = 0; i < fileCsv.length; i++) {
            fileCsv[i] = fileCsv[i].split(",");
        }

        return fileCsv;
    }

    // Cast strings to correct data type
    #cast(val, type) {
        switch(type) {
            case "TEXT":
                return val.trim();
                break;
            case "INTEGER":
                return parseInt(val);
                break;
            case "BOOLEAN":
                return Boolean(parseInt(val));
                break;
        }
    }
}

module.exports = { FileParser }