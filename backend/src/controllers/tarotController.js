const Reading = require('../models/Reading');
const { validationResult } = require('express-validator');

// Obtener todas las lecturas de un usuario
exports.getReadings = async (req, res) => {
  try {
    const readings = await Reading.find({ user: req.user.id }).sort('-date');
    res.json(readings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener una lectura específica
exports.getReading = async (req, res) => {
  try {
    const reading = await Reading.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!reading) {
      return res.status(404).json({ message: 'Lectura no encontrada' });
    }

    res.json(reading);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Crear una nueva lectura
exports.createReading = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, cards, interpretation, question } = req.body;

    const reading = new Reading({
      user: req.user.id,
      type,
      cards,
      interpretation,
      question
    });

    await reading.save();
    res.status(201).json(reading);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminar una lectura
exports.deleteReading = async (req, res) => {
  try {
    const reading = await Reading.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!reading) {
      return res.status(404).json({ message: 'Lectura no encontrada' });
    }

    await reading.remove();
    res.json({ message: 'Lectura eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}; 