const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_UserLogin, (req, res) => {
    const { username, password } = req.body
  
    const sql_read = "SELECT * FROM empinfo where empId = ?"
  
    const value = [username]
      
    conn.query(sql_read, value, (err, dbResults) => {
      if (err) {
        res.status(500).json({ success: false, error: "數據庫查詢錯誤" });
      } else {
        if (dbResults.length > 0) {
          const user = dbResults[0];
          if (user.pasd === password) {
  
            let tokenInfo = {
                empId: user.empId,        //員工編號
                name: user.name,          //姓名
                depName: user.depName,    //部門名稱
                userAccess: user.access   //權限集名稱
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

module.exports = router;