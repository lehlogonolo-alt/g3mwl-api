const { poolPromise } = require('../config/db');

async function getDashboardData() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT 
      (SELECT COUNT(*) FROM Patients) AS totalPatients,
      (SELECT COUNT(*) FROM SideEffects) AS sideEffectCount,
      (SELECT AVG(StartingWeight) FROM Patients) AS averageStartingWeight
  `);
  return result.recordset[0];
}

module.exports = { getDashboardData };
