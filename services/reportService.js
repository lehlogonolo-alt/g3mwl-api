const { poolPromise } = require('../config/db');

exports.createReport = async (data) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('WeekNumber', data.WeekNumber)
    .input('Weight', data.Weight)
    .input('Dosage', data.Dosage)
    .input('SideEffects', data.SideEffects)
    .input('Results', data.Results)
    .input('Notes', data.Notes)
    .input('PatientId', data.PatientId)
    .query(`
      INSERT INTO WeeklyReports (WeekNumber, Weight, Dosage, SideEffects, Results, Notes, PatientId)
      VALUES (@WeekNumber, @Weight, @Dosage, @SideEffects, @Results, @Notes, @PatientId);
    `);
  return result;
};

exports.getReportsByPatient = async (patientId) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('PatientId', patientId)
    .query(`
      SELECT * FROM WeeklyReports WHERE PatientId = @PatientId ORDER BY WeekNumber;
    `);
  return result.recordset;
};

exports.updateReport = async (id, data) => {
  const pool = await poolPromise;
  await pool.request()
    .input('Id', id)
    .input('WeekNumber', data.WeekNumber)
    .input('Weight', data.Weight)
    .input('Dosage', data.Dosage)
    .input('SideEffects', data.SideEffects)
    .input('Results', data.Results)
    .input('Notes', data.Notes)
    .query(`
      UPDATE WeeklyReports
      SET WeekNumber = @WeekNumber,
          Weight = @Weight,
          Dosage = @Dosage,
          SideEffects = @SideEffects,
          Results = @Results,
          Notes = @Notes
      WHERE Id = @Id;
    `);
  return { message: 'Report updated' };
};

exports.deleteReport = async (id) => {
  const pool = await poolPromise;
  await pool.request()
    .input('Id', id)
    .query(`DELETE FROM WeeklyReports WHERE Id = @Id;`);
};
