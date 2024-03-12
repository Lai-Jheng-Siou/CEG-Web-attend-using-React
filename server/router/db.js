const mysql = require('mysql2')
require('dotenv').config({ path: '../../.env' })

const config = {
    host: process.env.DB_host,
    port: process.env.DB_port,
    user: process.env.DB_user,
    password: process.env.DB_pasd,
    database: process.env.DB_database
}

module.exports = mysql.createConnection(config)