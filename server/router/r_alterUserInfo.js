const express = require('express');
const conn = require('../connect/db')
const { sqlQuery } = require('../connect/config')
require('dotenv').config({ path: '../../.env' });

const token = require('../token')

const router = express.Router()

router.post('/alterUser', (req, res) => {
    const { empToken,  } = req.body
    
})