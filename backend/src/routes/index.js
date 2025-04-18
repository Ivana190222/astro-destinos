const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const natalChartRoutes = require('./natalChart');
const compatibilityRoutes = require('./compatibility');

// Rutas
router.use('/auth', authRoutes);
router.use('/natal-chart', natalChartRoutes);
router.use('/compatibility', compatibilityRoutes);

module.exports = router; 