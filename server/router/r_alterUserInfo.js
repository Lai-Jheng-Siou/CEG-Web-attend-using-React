const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_AlterUserInfo, (req, res) => {
    const { empToken,  newInfo} = req.body
    let tokenDecode = token.tokenParse(empToken)
    if(!tokenDecode.error) {
      const values = [ newInfo.password, newInfo.name, newInfo.department, newInfo.access, newInfo.email, newInfo.account ]
      const sqlKeyIn = `
      UPDATE empinfo 
      SET
        pasd = ?,
        name = ?,
        depName = ?,
        access = ?,
        email = ? 
      WHERE empId = ?;
      `
      console.log(values)
      conn.query(sqlKeyIn, values, (error, dbResult) => {
        if(error) {
          res.status(500).json({ success: false, error: error })
        }else [
          res.json({ success: true, status: "資料庫更新成功" })
        ]
      })
    }else {
      res.json({ success: false, error: "登入時間已過期" })
    }
})

module.exports = router