const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 10000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  // 解碼網址防止中文或特殊字元出錯
  let safeUrl = decodeURIComponent(req.url.split('?')[0]);
  
  // 阻擋惡意路徑穿越
  if (safeUrl.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  // 計算實際檔案路徑
  let filePath = path.join(__dirname, safeUrl === '/' ? 'index.html' : safeUrl);
  let extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 如果找不到檔案（例如前端路由 /404 ），一律回傳 index.html 讓前端 React 自己處理
        fs.readFile(path.join(__dirname, 'index.html'), (err, indexContent) => {
          if (err) {
            res.writeHead(500);
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
