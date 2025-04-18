const { calculateAspects } = require('./aspectCalculator');
const { interpretCompatibility } = require('./compatibilityInterpreter');

const astrologyService = {
  async calculateCompatibility(user1, user2, relationshipType) {
    // Obtener las cartas astrales de ambos usuarios
    const chart1 = user1.astralChart;
    const chart2 = user2.astralChart;

    // Calcular los aspectos entre las cartas
    const aspects = calculateAspects(chart1, chart2);

    // Calcular el puntaje de compatibilidad basado en los aspectos
    const score = calculateCompatibilityScore(aspects, relationshipType);

    // Generar la interpretación
    const interpretation = interpretCompatibility(aspects, score, relationshipType);

    return {
      score,
      aspects,
      interpretation
    };
  }
};

function calculateCompatibilityScore(aspects, relationshipType) {
  let score = 50; // Puntaje base

  // Ajustar el puntaje según los aspectos
  aspects.forEach(aspect => {
    switch (aspect.type) {
      case 'conjunction':
        score += aspect.harmonic ? 10 : -10;
        break;
      case 'opposition':
        score += aspect.harmonic ? 5 : -5;
        break;
      case 'trine':
        score += aspect.harmonic ? 15 : -15;
        break;
      case 'square':
        score += aspect.harmonic ? 8 : -8;
        break;
      case 'sextile':
        score += aspect.harmonic ? 12 : -12;
        break;
    }
  });

  // Ajustar según el tipo de relación
  switch (relationshipType) {
    case 'amorosa':
      // Enfasis en aspectos emocionales y de comunicación
      score = adjustForLoveCompatibility(score, aspects);
      break;
    case 'amistad':
      // Enfasis en aspectos de comunicación y valores compartidos
      score = adjustForFriendshipCompatibility(score, aspects);
      break;
    case 'laboral':
      // Enfasis en aspectos de trabajo en equipo y objetivos
      score = adjustForWorkCompatibility(score, aspects);
      break;
    case 'familiar':
      // Enfasis en aspectos de apoyo y comprensión
      score = adjustForFamilyCompatibility(score, aspects);
      break;
  }

  // Asegurar que el puntaje esté entre 0 y 100
  return Math.max(0, Math.min(100, score));
}

function adjustForLoveCompatibility(score, aspects) {
  // Ajustar el puntaje para compatibilidad amorosa
  const emotionalAspects = aspects.filter(aspect => 
    aspect.planets.some(p => ['Moon', 'Venus'].includes(p))
  );
  return score + (emotionalAspects.length * 2);
}

function adjustForFriendshipCompatibility(score, aspects) {
  // Ajustar el puntaje para compatibilidad de amistad
  const communicationAspects = aspects.filter(aspect => 
    aspect.planets.some(p => ['Mercury', 'Jupiter'].includes(p))
  );
  return score + (communicationAspects.length * 1.5);
}

function adjustForWorkCompatibility(score, aspects) {
  // Ajustar el puntaje para compatibilidad laboral
  const workAspects = aspects.filter(aspect => 
    aspect.planets.some(p => ['Saturn', 'Mars'].includes(p))
  );
  return score + (workAspects.length * 2);
}

function adjustForFamilyCompatibility(score, aspects) {
  // Ajustar el puntaje para compatibilidad familiar
  const familyAspects = aspects.filter(aspect => 
    aspect.planets.some(p => ['Moon', 'Saturn'].includes(p))
  );
  return score + (familyAspects.length * 1.5);
}

module.exports = astrologyService; 