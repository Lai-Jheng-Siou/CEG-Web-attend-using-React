const express = require('express');
const conn = require('./db')

const token = require('../token')

const router = express.Router()

router.post('/alterUser', (req, res) => {
    const { empToken,  } = req.body
    
})