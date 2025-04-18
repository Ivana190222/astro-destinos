const NatalChart = require('../models/NatalChart');
const { validationResult } = require('express-validator');

// Obtener la carta astral de un usuario
exports.getNatalChart = async (req, res) => {
  try {
    const natalChart = await NatalChart.findOne({
      where: { userId: req.user.id }
    });

    if (!natalChart) {
      return res.status(404).json({ message: 'Carta astral no encontrada' });
    }

    res.json(natalChart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Crear o actualizar carta astral
exports.createOrUpdateNatalChart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      sunSign,
      moonSign,
      ascendant,
      planets,
      houses,
      aspects,
      interpretation
    } = req.body;

    // Buscar si ya existe una carta astral
    let natalChart = await NatalChart.findOne({
      where: { userId: req.user.id }
    });

    if (natalChart) {
      // Actualizar carta existente
      natalChart = await natalChart.update({
        sunSign,
        moonSign,
        ascendant,
        planets,
        houses,
        aspects,
        interpretation
      });
    } else {
      // Crear nueva carta
      natalChart = await NatalChart.create({
        userId: req.user.id,
        sunSign,
        moonSign,
        ascendant,
        planets,
        houses,
        aspects,
        interpretation
      });
    }

    res.status(201).json(natalChart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Calcular carta astral
exports.calculateNatalChart = async (req, res) => {
  try {
    const { birthDate, birthTime, birthPlace } = req.body;

    // Aquí iría la lógica para calcular la carta astral
    // Por ahora, usaremos datos simulados
    const calculatedChart = {
      sunSign: 'aries', // Esto se calcularía basado en la fecha
      moonSign: 'taurus', // Esto se calcularía basado en la fecha y hora
      ascendant: 'gemini', // Esto se calcularía basado en la fecha, hora y lugar
      planets: {
        mercury: 'aries',
        venus: 'taurus',
        mars: 'gemini',
        jupiter: 'cancer',
        saturn: 'leo',
        uranus: 'virgo',
        neptune: 'libra',
        pluto: 'scorpio'
      },
      houses: {
        1: 'aries',
        2: 'taurus',
        3: 'gemini',
        4: 'cancer',
        5: 'leo',
        6: 'virgo',
        7: 'libra',
        8: 'scorpio',
        9: 'sagitario',
        10: 'capricornio',
        11: 'acuario',
        12: 'piscis'
      },
      aspects: [
        {
          planet1: 'sun',
          planet2: 'moon',
          type: 'conjunction',
          orb: 5
        }
      ],
      interpretation: 'Interpretación detallada de la carta astral...'
    };

    res.json(calculatedChart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}; 