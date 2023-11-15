const Pool = require("pg").Pool;
const config = require('./config.json')

const pool = new Pool({
    user: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.db_port
})

module.exports = pool;