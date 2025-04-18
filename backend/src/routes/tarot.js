const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const tarotController = require('../controllers/tarotController');
const auth = require('../middleware/auth');

// Validaciones
const readingValidation = [
  check('type', 'El tipo de lectura es requerido').not().isEmpty(),
  check('cards', 'Las cartas son requeridas').isArray({ min: 1 }),
  check('interpretation', 'La interpretación es requerida').not().isEmpty(),
  check('question', 'La pregunta es requerida').not().isEmpty()
];

// Rutas
router.get('/', auth, tarotController.getReadings);
router.get('/:id', auth, tarotController.getReading);
router.post('/', [auth, readingValidation], tarotController.createReading);
router.delete('/:id', auth, tarotController.deleteReading);

module.exports = router; 