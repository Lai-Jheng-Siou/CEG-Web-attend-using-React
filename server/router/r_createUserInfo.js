const express = require('express')
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_CreateUserInfo, (req, res) => {  //需要作密碼加密
    const { empToken, value } = req.body
    const tokenDecode = token.tokenParse(empToken)

    if(!tokenDecode.error) {
        const sqlKeyIn = `INSERT INTO empInfo(empId, pasd, name, depName, email, access) VALUES(?, ?, ?, ?, ?, ?)`

        conn.query(sqlKeyIn, value, (err) => {
            if(err) {
                res.status(500).json({ success: false, error: "數據庫輸入錯誤" });
            }else {
                res.json({ success: true })
            }
        })
    }
})

module.exports = router