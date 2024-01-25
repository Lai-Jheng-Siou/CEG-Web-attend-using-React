const express = require('express');
const conn = require('./connect/db')
const { config } = require('./connect/config')
const { sqlQuery } = require('./connect/config')
require('dotenv').config({ path: '../.env' });

const token = require('./token')

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

// 登入路由
app.post('/user/login', (req, res) => {
  const { username, password } = req.body

  const sql_read = sqlQuery.read.readEmpInfo

  const value = [username]
    
  conn.query(sql_read, value, (err, dbResults) => {
    if (err) {
      res.status(500).json({ success: false, error: "數據庫查詢錯誤" });
    } else {
      if (dbResults.length > 0) {
        const user = dbResults[0];
        if (user.pasd === password) {

          let tokenInfo = {
              empId: user.empId,
              name: user.name,
              depName: user.depName,
              userAccess: user.access
            }
          const newToken = token.makeToken(tokenInfo)

          let obj = {
            empId: user.empId,
            name: user.name,
            depName: user.depName,
            success: true,
            token: newToken
          }
          res.json(obj);
        } else {
          res.status(401).json({ success: false, error: "密碼錯誤" });
        }
      } else {
        res.status(404).json({ success: false, error: "用戶不存在" });
      }
    }
  });
});


//上下班打卡路由
app.post('/attend', (req, res) => {
  const { empId, atdDate, atdTime, ip, buildId, empToken } = req.body
  let tokenDecode = token.tokenParse(empToken)
  if ( !tokenDecode.error ) {
    const sqlKeyIn = sqlQuery.insert.addAttend

    const value = [empId, atdDate, atdTime, ip, buildId]
    conn.query(sqlKeyIn, value, (err) => {
      if (err) {
        res.status(500).json({ success: false, error: "數據庫輸入錯誤" });
      } else {
        res.json({success: true})
      }
    })

  } else {
    res.json({ success: false, error: "登入時間已過期" })
  }
})


//打卡紀錄
app.post('/record', (req, res) => {
  const { empToken } = req.body
  let tokenDecode = token.tokenParse(empToken)
  if(!tokenDecode.error) {
    const sqlKeyIn = sqlQuery.read.readAttend

    const value = [tokenDecode.empId]

    conn.query(sqlKeyIn, value, (err, dbResults) => {
      if (err) {
        res.status(500).json({ success: false, error: "數據庫輸入錯誤" });
      } else {
        dbResults.apiKey = process.env.Google_Api_Keys
        res.json(dbResults)
      }
    })
  }else {
    res.json({ success: false, error: "登入時間已過期" })
  }
})

app.post('/getKeys', (req, res) => {
  
})


// 啟動伺服器
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});