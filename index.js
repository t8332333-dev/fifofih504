const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 10000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
};

const server = http.createServer((req, res) => {
  let safeUrl = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(__dirname, safeUrl === '/' ? 'index.html' : safeUrl);
  let extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile(path.join(__dirname, 'index.html'), (err, indexContent) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexContent, 'utf-8');
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
