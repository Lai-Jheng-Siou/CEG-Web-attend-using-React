const express = require('express');
require('dotenv').config({ path: '../.env' });

const Router_login = require('./router/r_login')
const Router_attend = require('./router/r_attend')
const Router_record = require('./router/r_record')
const Roputer_getUerInfo = require('./router/r_getUserInfo')
const Router_getTableLen = require('./router/r_tableLen');
const Router_attendSearch = require('./router/r_attendSearch')

const app = express();

// 中間件：解析 JSON 請求
app.use(express.json());

// 中間件：處理 CORS 問題（如果需要）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/', Router_login)  // 登入路由

app.use('/', Router_attend)  //上下班打卡路由

app.use('/', Router_record)  //打卡紀錄

app.use('/', Roputer_getUerInfo) //取得員工資料

app.use('/', Router_getTableLen)  //取得表格長度

app.use('/', Router_attendSearch)  //更新員工資料


// 啟動伺服器
app.listen(process.env.backEnd_port, () => {
  console.log(`Server is running at http://localhost:${process.env.backEnd_port}`);
});