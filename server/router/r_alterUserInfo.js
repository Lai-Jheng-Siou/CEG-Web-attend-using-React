const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post('/alterUser', (req, res) => {
    const { empToken,  newInfo} = req.body
    let tokenDecode = token.tokenParse(empToken)

    if(!tokenDecode.error) {
        const sqoKeyIn = `SELECT `




    }else {
      res.json({ success: false, error: "登入時間已過期" })
    }
})

module.exports = router