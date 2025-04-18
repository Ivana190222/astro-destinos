const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const compatibilityController = require('../controllers/compatibilityController');
const auth = require('../middleware/auth');

// Validaciones
const compatibilityValidation = [
  check('chartId1', 'El ID de la primera carta es requerido').not().isEmpty(),
  check('chartId2', 'El ID de la segunda carta es requerido').not().isEmpty(),
  check('relationshipType', 'El tipo de relación es requerido').isIn(['romantic', 'friendship', 'work'])
];

// Rutas
router.post('/calculate', [auth, compatibilityValidation], compatibilityController.calculateCompatibility);

module.exports = router; 