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
          // dbResults.page = 
          let ary = []
          dbResults.forEach(item => {
            ary.push([item.empId, item.pasd, item.name, item.depName, item.email, item.access])
          })
          res.json(ary)
        }
      })
    }else {
      res.json({ success: false, error: "登入時間已過期" })
    }
})

module.exports = router;