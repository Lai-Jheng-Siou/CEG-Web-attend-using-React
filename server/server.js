const express = require('express');
const { config } = require('./connect/config')
require('dotenv').config({ path: '../.env' });

const Router_login = require('./router/r_login')
const Router_attend = require('./router/r_attend')
const Router_record = require('./router/r_record')
const Roputer_getUerInfo = require('./router/r_getUserInfo')
const Router_getTableLen = require('./router/r_tableLen');

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


// app.use('/', XXX)  //更新員工資料


// 啟動伺服器
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});