const ASPECTS = {
  CONJUNCTION: { angle: 0, orb: 8 },
  OPPOSITION: { angle: 180, orb: 8 },
  TRINE: { angle: 120, orb: 8 },
  SQUARE: { angle: 90, orb: 8 },
  SEXTILE: { angle: 60, orb: 6 }
};

const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
];

function calculateAspects(chart1, chart2) {
  const aspects = [];

  // Calcular aspectos entre planetas de ambas cartas
  for (const planet1 of PLANETS) {
    for (const planet2 of PLANETS) {
      const position1 = chart1.positions[planet1];
      const position2 = chart2.positions[planet2];

      if (!position1 || !position2) continue;

      const angle = calculateAngle(position1, position2);

      // Verificar cada tipo de aspecto
      for (const [aspectName, aspectConfig] of Object.entries(ASPECTS)) {
        if (isWithinOrb(angle, aspectConfig.angle, aspectConfig.orb)) {
          aspects.push({
            type: aspectName.toLowerCase(),
            planets: [planet1, planet2],
            angle,
            orb: Math.abs(angle - aspectConfig.angle),
            harmonic: isHarmonicAspect(aspectName)
          });
        }
      }
    }
  }

  return aspects;
}

function calculateAngle(position1, position2) {
  let angle = Math.abs(position1 - position2);
  if (angle > 180) {
    angle = 360 - angle;
  }
  return angle;
}

function isWithinOrb(angle, targetAngle, orb) {
  return Math.abs(angle - targetAngle) <= orb;
}

function isHarmonicAspect(aspectName) {
  const harmonicAspects = ['TRINE', 'SEXTILE'];
  return harmonicAspects.includes(aspectName);
}

module.exports = {
  calculateAspects
}; 