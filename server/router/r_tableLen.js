const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_GetTableLen, (req, res) => {
    const { empToken, tableName } = req.body
    let tokenDecode = token.tokenParse(empToken)
    if(!tokenDecode.error) {

      const sqlKeyIn = "SELECT COUNT(*) AS TOTAL_ROWS FROM ??"
  
      const value = [tableName]
      conn.query(sqlKeyIn, value, (err, dbResults) => {
        if (err) {
            res.status(500).json({ success: false, error: "數據庫請求錯誤" });
        } else {
            res.json(dbResults)
        }
      })
    }else {
      res.json({ success: false, error: "登入時間已過期" })
    }
})


module.exports = router;