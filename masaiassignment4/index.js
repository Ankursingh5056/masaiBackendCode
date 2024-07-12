const http = require("http");
const fs = require('fs');
const path = require('path'); 
const Port = 3000;
//done
const server = http.createServer((req, res) => {
    function send404Response() {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
    }

    function sendDirectoryListing(directoryPath) {
        fs.readdir(directoryPath, (err, data) => {
            if (err) {
                send404Response();
            } else {
                let response = "<ul>";
                data.forEach(file => {
                    const fileUrl = path.join(req.url, file).replace(/\\/g, '/');
                    response += <li><a href="${fileUrl}">${file}</a></li>;
                });
                response += '</ul>';
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(response);
            }
        });
    }

    function sendFileContent(filePath) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                send404Response();
            } else {
                res.writeHead(200, { 'Content-Type': "text/plain" });
                res.end(data);
            }
        });
    }

    if (req.method !== 'GET') {
        send404Response();
        return;
    }

    if (req.url === '/') {
        sendDirectoryListing(__dirname);
    } else {
        const resourcePath = path.join(__dirname, req.url);

        fs.stat(resourcePath, (err, stats) => {
            if (err) {
                send404Response();
            } else {
                if (stats.isDirectory()) {
                    sendDirectoryListing(resourcePath);
                } else {
                    sendFileContent(resourcePath);
                }
            }
        });
    }
});

module.exports = server;

server.listen(Port, () => {
    console.log("server is running", Port);
});