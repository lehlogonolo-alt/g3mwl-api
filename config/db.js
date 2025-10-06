const sql = require('mssql');
require('dotenv').config();

const poolPromise = new sql.ConnectionPool({
  connectionString: process.env.SQL_SERVER_CONNECTION_STRING,
})
.connect()
.then(pool => {
  console.log('✅ Connected to Azure SQL Server');
  return pool;
})
.catch(err => {
  console.error('❌ DB Connection Failed:', err.message);
  throw err; // so that failed connections don’t silently fail
});

module.exports = { sql, poolPromise };










