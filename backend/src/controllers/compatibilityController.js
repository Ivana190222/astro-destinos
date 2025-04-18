const { User, Compatibility } = require('../models');
const { calculateCompatibility } = require('../services/astrologyService');
const { calculateAspects } = require('../services/aspectCalculator');
const { interpretCompatibility } = require('../services/compatibilityInterpreter');
const NatalChart = require('../models/NatalChart');

const compatibilityController = {
  // Obtener todas las compatibilidades de un usuario
  async getUserCompatibilities(req, res) {
    try {
      const userId = req.user.id;
      const compatibilities = await Compatibility.findAll({
        where: {
          [Op.or]: [
            { userId1: userId },
            { userId2: userId }
          ]
        },
        include: [
          { model: User, as: 'User1', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'User2', attributes: ['id', 'name', 'email'] }
        ]
      });
      res.json(compatibilities);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las compatibilidades' });
    }
  },

  // Calcular compatibilidad entre dos usuarios
  async calculateCompatibility(req, res) {
    try {
      const { chartId1, chartId2, relationshipType } = req.body;

      // Validar el tipo de relación
      if (!['romantic', 'friendship', 'work'].includes(relationshipType)) {
        return res.status(400).json({ 
          error: 'Tipo de relación inválido. Debe ser: romantic, friendship o work' 
        });
      }

      // Obtener las cartas natales
      const chart1 = await NatalChart.findByPk(chartId1);
      const chart2 = await NatalChart.findByPk(chartId2);

      if (!chart1 || !chart2) {
        return res.status(404).json({ 
          error: 'Una o ambas cartas natales no fueron encontradas' 
        });
      }

      // Calcular aspectos
      const aspects = calculateAspects(chart1.planets, chart2.planets);

      // Interpretar compatibilidad
      const interpretations = interpretCompatibility(aspects, relationshipType);

      // Calcular puntaje de compatibilidad
      const compatibilityScore = calculateCompatibilityScore(interpretations);

      res.json({
        compatibilityScore,
        aspects: interpretations,
        summary: generateCompatibilitySummary(compatibilityScore, interpretations)
      });

    } catch (error) {
      console.error('Error al calcular compatibilidad:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor al calcular la compatibilidad' 
      });
    }
  },

  // Obtener una compatibilidad específica
  async getCompatibility(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const compatibility = await Compatibility.findOne({
        where: {
          id,
          [Op.or]: [
            { userId1: userId },
            { userId2: userId }
          ]
        },
        include: [
          { model: User, as: 'User1', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'User2', attributes: ['id', 'name', 'email'] }
        ]
      });

      if (!compatibility) {
        return res.status(404).json({ error: 'Compatibilidad no encontrada' });
      }

      res.json(compatibility);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la compatibilidad' });
    }
  }
};

function calculateCompatibilityScore(interpretations) {
  let score = 0;
  let totalAspects = interpretations.length;

  if (totalAspects === 0) return 50; // Puntaje neutral si no hay aspectos

  for (const aspect of interpretations) {
    if (aspect.harmonic) {
      score += 10;
    } else {
      score -= 5;
    }
  }

  // Normalizar el puntaje a un rango de 0-100
  const normalizedScore = Math.round((score / (totalAspects * 10)) * 100);
  return Math.max(0, Math.min(100, normalizedScore));
}

function generateCompatibilitySummary(score, interpretations) {
  const harmonicAspects = interpretations.filter(a => a.harmonic).length;
  const challengingAspects = interpretations.length - harmonicAspects;

  let summary = `Puntaje de compatibilidad: ${score}%\n\n`;
  summary += `Aspectos armónicos: ${harmonicAspects}\n`;
  summary += `Aspectos desafiantes: ${challengingAspects}\n\n`;

  if (score >= 70) {
    summary += "La compatibilidad es muy alta. Hay una fuerte conexión y armonía entre las cartas.";
  } else if (score >= 50) {
    summary += "La compatibilidad es moderada. Hay tanto aspectos positivos como desafíos que pueden superarse.";
  } else {
    summary += "La compatibilidad es baja. Hay varios desafíos que requieren atención y trabajo.";
  }

  return summary;
}

module.exports = compatibilityController; 