const { poolPromise } = require('../config/db');

async function getLastActivity(email) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('email', email)
    .query(`
      SELECT TOP 1 Action, Timestamp
      FROM UserActivities
      WHERE UserEmail = @email
      ORDER BY Timestamp DESC
    `);
  const last = result.recordset[0];
  return last ? `${last.Action} at ${last.Timestamp}` : 'No activity recorded';
}

async function getRecentActivities(count) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('count', count)
    .query(`
      SELECT TOP (@count) *
      FROM UserActivities
      ORDER BY Timestamp DESC
    `);
  return result.recordset;
}

module.exports = { getLastActivity, getRecentActivities };
