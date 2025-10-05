const { poolPromise } = require('../config/db');

async function logActivity(req, res) {
  try {
    const { action } = req.body;
    const email = req.user.email;
    const timestamp = new Date();

    const pool = await poolPromise;
    await pool.request()
      .input('UserEmail', email)
      .input('Action', action)
      .input('Timestamp', timestamp)
      .query(`
        INSERT INTO UserActivities (UserEmail, Action, Timestamp)
        VALUES (@UserEmail, @Action, @Timestamp)
      `);

    res.status(201).json({ message: 'Activity logged' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log activity' });
  }
}

module.exports = { logActivity };
