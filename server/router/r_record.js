const express = require('express');
const conn = require('../connect/db')
const { sqlQuery } = require('../connect/config')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_GetAtdRecord, (req, res) => {
    const { empToken } = req.body
    let tokenDecode = token.tokenParse(empToken)
    if(!tokenDecode.error) {
      const sqlKeyIn = sqlQuery.read.readAttend
  
      const value = [tokenDecode.empId]
  
      conn.query(sqlKeyIn, value, (err, dbResults) => {
        if (err) {
          res.status(500).json({ success: false, error: "數據庫輸入錯誤" });
        } else {
          res.json(dbResults)
        }
      })
    }else {
      res.json({ success: false, error: "登入時間已過期" })
    }
})

module.exports = router;