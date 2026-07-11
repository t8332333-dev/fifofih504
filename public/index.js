const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// 託管根目錄與 assets 資料夾
app.use(express.static(path.join(__dirname, '.')));

// 所有前端路由都指向 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
