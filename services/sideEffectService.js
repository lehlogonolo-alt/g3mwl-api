const { poolPromise } = require('../config/db');

async function getAllSideEffects() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM SideEffects');
  return result.recordset;
}

async function createSideEffect(name) {
  const pool = await poolPromise;
  await pool.request()
    .input('Name', name)
    .query('INSERT INTO SideEffects (Name) VALUES (@Name)');
}

module.exports = { getAllSideEffects, createSideEffect };
