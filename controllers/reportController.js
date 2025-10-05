const reportService = require('../services/reportService');

exports.createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create report', details: err.message });
  }
};

exports.getReportsByPatient = async (req, res) => {
  try {
    const reports = await reportService.getReportsByPatient(req.params.id);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports', details: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const updated = await reportService.updateReport(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update report', details: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    await reportService.deleteReport(req.params.id);
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete report', details: err.message });
  }
};
