// config/db.js
const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,       // nodeuser
  password: process.env.DB_PASS,   // StrongPassword123!
  server: process.env.DB_SERVER,   // g3mwl-sqlserver.database.windows.net
  database: process.env.DB_NAME,   // G3MWLDb
  options: {
    encrypt: true,                 // Azure SQL requires encryption
    trustServerCertificate: false
  },
  port: 1433
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















