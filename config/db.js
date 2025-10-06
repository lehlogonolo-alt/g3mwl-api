const sql = require('mssql');
require('dotenv').config();

let config;

// Use full connection string if provided (for Render/Azure)
if (process.env.SQL_SERVER_CONNECTION_STRING) {
  config = {
    connectionString: process.env.SQL_SERVER_CONNECTION_STRING,
    options: {
      encrypt: true,               // required for Azure SQL
      trustServerCertificate: false
    }
  };
} else {
  // Local development with separate env variables
  config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true,
      port: parseInt(process.env.DB_PORT, 10) || 1433,
    },
  };
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ DB Connection Failed:', err);
  });

module.exports = { sql, poolPromise };













