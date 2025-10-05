const patientService = require('../services/patientService');

async function getPatients(req, res) {
  const patients = await patientService.getAllPatients();
  res.json(patients);
}

async function createPatient(req, res) {
  await patientService.createPatient(req.body);
  res.status(201).json({ message: 'Patient created' });
}

module.exports = { getPatients, createPatient };
