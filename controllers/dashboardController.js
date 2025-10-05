// controllers/dashboardController.js
const dashboardService = require('../services/dashboardService');
const { poolPromise } = require('../config/db');

exports.getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardData();

    // 🔁 Auto-log site visit for G3MWL
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('SiteName', 'G3MWL')
        .input('VisitCount', 1)
        .input('Month', new Date())
        .query(`
          MERGE SiteVisits AS target
          USING (SELECT @SiteName AS SiteName, @Month AS Month) AS source
          ON target.SiteName = source.SiteName AND FORMAT(target.Month, 'yyyy-MM') = FORMAT(source.Month, 'yyyy-MM')
          WHEN MATCHED THEN
            UPDATE SET VisitCount = VisitCount + @VisitCount
          WHEN NOT MATCHED THEN
            INSERT (SiteName, VisitCount, Month)
            VALUES (@SiteName, @VisitCount, @Month);
        `);

      console.log('🔁 SiteVisit MERGE result:', result);
    } catch (logErr) {
      console.error('❌ SiteVisit MERGE failed:', logErr.message);
    }

    res.json(data);
  } catch (err) {
    console.error('❌ Dashboard load failed:', err.message);
    res.status(500).json({ error: 'Failed to load dashboard', details: err.message });
  }
};





