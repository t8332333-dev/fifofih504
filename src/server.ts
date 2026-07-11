import express from 'express';
import path from 'path';

const app = express();

// 1. 先設定 tRPC 或 API 路由 (您原本後端就有的內容)
// app.use('/api/trpc', ...);

// 2. 託管靜態檔案 (告訴後端去哪裡找前端的 CSS/JS)
app.use(express.static(path.join(__dirname, '../public')));

// 3. 關鍵防 404 設定：任何前端路由重新整理，都一律指向 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000, () => console.log('倉庫系統後端已啟動於 port 3000'));
