const sql = require('mssql');
require('dotenv').config();

const config = {
  connectionString: process.env.SQL_SERVER_CONNECTION_STRING,
  options: {
    encrypt: true,               // for Azure SQL
    trustServerCertificate: false
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to Azure SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ DB Connection Failed:', err);
  });

module.exports = { sql, poolPromise };












