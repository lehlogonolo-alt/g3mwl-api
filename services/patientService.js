const { poolPromise } = require('../config/db');

async function getAllPatients() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Patients');
  return result.recordset;
}

async function createPatient(data) {
  const pool = await poolPromise;
  await pool.request()
    .input('FirstName', data.firstName)
    .input('LastName', data.lastName)
    .input('Age', data.age)
    .input('Gender', data.gender)
    .input('TreatmentStartDate', data.treatmentStartDate)
    .input('StartingWeight', data.startingWeight)
    .query(`
      INSERT INTO Patients (FirstName, LastName, Age, Gender, TreatmentStartDate, StartingWeight)
      VALUES (@FirstName, @LastName, @Age, @Gender, @TreatmentStartDate, @StartingWeight)
    `);
}

module.exports = { getAllPatients, createPatient };
