const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const auth = require('../middleware/auth');

router.post('/', auth, activityController.logActivity);

module.exports = router;
