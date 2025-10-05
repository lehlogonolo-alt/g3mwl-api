const { poolPromise } = require('../config/db');

async function getMonthlyVisits(siteName) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('siteName', siteName)
    .query(`
      SELECT FORMAT(Month, 'MMM') AS Month, SUM(VisitCount) AS Count
      FROM SiteVisits
      WHERE SiteName = @siteName
      GROUP BY FORMAT(Month, 'MMM')
      ORDER BY MIN(Month)
    `);
  return result.recordset;
}

module.exports = { getMonthlyVisits };
