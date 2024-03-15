const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_GetUserInfo, (req, res) => {
    const { empToken, page } = req.body
    let tokenDecode = token.tokenParse(empToken)
    if(!tokenDecode.error) {
      const sqlKeyIn = "SELECT * FROM empinfo limit ? offset ?"
  
      const value = [10, page]
  
      conn.query(sqlKeyIn, value, (err, dbResults) => {
        if (err) {
          res.status(500).json({ success: false, error: "數據庫請求錯誤" });
        } else {
          let ary = []
          dbResults.forEach(item => {
            let obj = {}
            obj['account'] = item.empId
            obj['password'] = item.pasd
            obj['name'] = item.name
            obj['department'] = item.depName
            obj['email'] = item.email
            obj['access'] = item.access
            ary.push(obj)
          })
          res.json(ary)
        }
      })
    }else {
      res.json({ success: false, error: "登入時間已過期" })
    }
})

module.exports = router;