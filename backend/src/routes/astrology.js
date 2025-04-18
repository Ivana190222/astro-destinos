const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const natalChartController = require('../controllers/natalChartController');
const auth = require('../middleware/auth');

// Validaciones
const natalChartValidation = [
  check('sunSign', 'El signo solar es requerido').not().isEmpty(),
  check('moonSign', 'El signo lunar es requerido').not().isEmpty(),
  check('ascendant', 'El ascendente es requerido').not().isEmpty(),
  check('planets', 'Los planetas son requeridos').not().isEmpty(),
  check('houses', 'Las casas son requeridas').not().isEmpty(),
  check('aspects', 'Los aspectos son requeridos').not().isEmpty(),
  check('interpretation', 'La interpretación es requerida').not().isEmpty()
];

const calculationValidation = [
  check('birthDate', 'La fecha de nacimiento es requerida').not().isEmpty(),
  check('birthTime', 'La hora de nacimiento es requerida').not().isEmpty(),
  check('birthPlace', 'El lugar de nacimiento es requerido').not().isEmpty()
];

// Rutas
router.get('/natal-chart', auth, natalChartController.getNatalChart);
router.post('/natal-chart', [auth, natalChartValidation], natalChartController.createOrUpdateNatalChart);
router.post('/calculate', [auth, calculationValidation], natalChartController.calculateNatalChart);

module.exports = router; 