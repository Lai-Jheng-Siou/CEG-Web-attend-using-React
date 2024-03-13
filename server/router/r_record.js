const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post(process.env.REACT_APP_GetAtdRecord, (req, res) => {
    const { empToken } = req.body
    let tokenDecode = token.tokenParse(empToken)
    if(!tokenDecode.error) {
      const sqlKeyIn = `select e.empId, ei.name, DATE_FORMAT(e.atdDate, '%Y/%m/%d') AS atdDate,
                    e.atdTime, e.BuildId, e.Ip 
                    from EMPATTEND e left join EMPINFO ei on e.empId = ei.empId
                    where e.empId = ?
                `
  
      const value = [tokenDecode.empId]
  
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