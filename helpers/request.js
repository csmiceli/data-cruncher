'use strict';
const https = require('https');

// HTTPS POST
function post(options, body = {}) { 
  options.method = "POST";
  options.port = 443;

  return new Promise((resolve, reject) => {   
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (d) => {
        data += d;
      });

      res.on("end", () => {
        resolve(data);
      });

    });

    req.on("error", (err) => {
      reject(err);
    });
    req.write(body);
    req.end();
  });
}

module.exports = {
  post
}