const express = require('express');
const conn = require('../connect/db')
const { sqlQuery } = require('../connect/config')
require('dotenv').config({ path: '../../.env' });

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_GetUserInfo, (req, res) => {
    const { empToken, page } = req.body
    let tokenDecode = token.tokenParse(empToken)
    if(!tokenDecode.error) {
      const sqlKeyIn = sqlQuery.read.readEmpAllInfo
  
      const value = [10, page]
  
      conn.query(sqlKeyIn, value, (err, dbResults) => {
        if (err) {
          res.status(500).json({ success: false, error: "數據庫請求錯誤" });
        } else {
          dbResults.page = 
          res.json(dbResults)
        }
      })
    }else {
      res.json({ success: false, error: "登入時間已過期" })
    }
})

module.exports = router;