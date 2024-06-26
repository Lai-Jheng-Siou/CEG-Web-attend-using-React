const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_AddAttend, (req, res) => {
    const { empId, atdDate, atdTime, ip, buildId, empToken } = req.body
    let tokenDecode = token.tokenParse(empToken)
    if ( !tokenDecode.error ) {
      const sqlKeyIn = "INSERT INTO empattend(empId, atdDate, atdTime, Ip, buildId) VALUES(?, ?, ?, ?, ?)"
  
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

module.exports = router;