const express = require('express')
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_GetAttendSearch, (req, res) => {
    const { empToken, id, name, date } = req.body

    let tokenDecode = token.tokenParse(empToken)
    if(tokenDecode) {
        let sqlKeyIn = `select e.empId, 
        DATE_FORMAT(e.atdDate, '%Y/%m/%d') AS atdDate,
        e.atdTime,
        e.Ip,
        e.BuildId,
        ei.name 
        from EMPATTEND e left join EMPINFO ei on e.empId = ei.empId
        where 
        `
        let value = []

        if(id) {
            sqlKeyIn += "e.empId = ? AND "
            value.push(id)
        }
        if(name) {
            sqlKeyIn += "ei.name = ? AND "
            value.push(name)
        }
        if(date) {
            sqlKeyIn += "e.atdDate = ? AND "
            value.push(date)
        }

        sqlKeyIn = sqlKeyIn.slice(0, -5)
        console.log(sqlKeyIn)
        console.log(value)
        conn.query(sqlKeyIn, value, (err, dbResults) => {
            if (err) {
                res.status(500).json({ success: false, error: "數據庫輸入錯誤" });
            } else {
                const ary = []
                for(let i of dbResults.values()) {
                    let tmpAry = []
                    for(let j of Object.values(i)) {
                    tmpAry.push(j)
                    }
                    ary.push(tmpAry)
                }
                res.json(ary)
            }
        })
    }else {
        res.json({ success: false, error: "登入時間已過期" })
    }
})

module.exports = router;