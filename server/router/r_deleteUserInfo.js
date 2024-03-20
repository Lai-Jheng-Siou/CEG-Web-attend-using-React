const express = require('express')
const conn = require('./db')
const token = require('../token')

const router = express.Router()
router.post(process.env.REACT_APP_DeleteUserInfo, (req, res) => {
    const { empToken, value } = req.body
    const tokenDecode = token.tokenParse(empToken)

    if(!tokenDecode.error) {
        squKeyIn = `DELETE FROM empInfo WHERE empId = ?`

        conn.query(squKeyIn, value, (error, dbResult) => {
            if(error) {
                res.status(500).json(error)
            }else {
                res.json({success: true})
            }
        })
    }
})


module.exports = router