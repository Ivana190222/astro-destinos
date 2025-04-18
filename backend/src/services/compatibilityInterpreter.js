const INTERPRETATIONS = {
  romantic: {
    conjunction: {
      Sun: "Hay una fuerte conexión de identidad y propósito de vida",
      Moon: "Las emociones y necesidades se alinean naturalmente",
      Venus: "Existe una fuerte atracción y armonía en el amor",
      Mars: "La pasión y la energía sexual son intensas"
    },
    opposition: {
      Sun: "Puede haber diferencias en la forma de ver la vida",
      Moon: "Las necesidades emocionales pueden chocar",
      Venus: "Los valores y formas de amar pueden ser diferentes",
      Mars: "Los estilos de acción y deseo pueden oponerse"
    },
    trine: {
      Sun: "Hay una comprensión natural mutua",
      Moon: "Las emociones fluyen con facilidad",
      Venus: "El amor y la armonía son naturales",
      Mars: "La energía y la pasión se complementan"
    },
    square: {
      Sun: "Puede haber tensiones en la forma de ver la vida",
      Moon: "Las emociones pueden ser difíciles de manejar",
      Venus: "Los valores y formas de amar pueden crear fricción",
      Mars: "La energía y la pasión pueden chocar"
    },
    sextile: {
      Sun: "Hay oportunidades para crecer juntos",
      Moon: "Las emociones se pueden armonizar con esfuerzo",
      Venus: "El amor puede florecer con trabajo mutuo",
      Mars: "La energía y la pasión pueden equilibrarse"
    }
  },
  friendship: {
    conjunction: {
      Mercury: "La comunicación es fluida y natural",
      Jupiter: "Comparten valores y filosofías de vida",
      Saturn: "Hay un sentido de responsabilidad mutua"
    },
    opposition: {
      Mercury: "Puede haber diferencias en la comunicación",
      Jupiter: "Los valores y creencias pueden diferir",
      Saturn: "Las responsabilidades pueden ser un punto de tensión"
    },
    trine: {
      Mercury: "La comunicación es armoniosa",
      Jupiter: "Comparten una visión optimista de la vida",
      Saturn: "Hay un respeto mutuo por los límites"
    },
    square: {
      Mercury: "La comunicación puede ser un desafío",
      Jupiter: "Las creencias pueden chocar",
      Saturn: "Las responsabilidades pueden crear tensión"
    },
    sextile: {
      Mercury: "La comunicación puede mejorar con esfuerzo",
      Jupiter: "Los valores pueden alinearse con trabajo",
      Saturn: "Las responsabilidades pueden equilibrarse"
    }
  },
  work: {
    conjunction: {
      Mercury: "La comunicación profesional es efectiva",
      Mars: "La energía y motivación se alinean",
      Saturn: "Hay un sentido de responsabilidad compartida"
    },
    opposition: {
      Mercury: "Puede haber diferencias en la comunicación laboral",
      Mars: "Los estilos de trabajo pueden chocar",
      Saturn: "Las responsabilidades pueden ser un punto de tensión"
    },
    trine: {
      Mercury: "La comunicación profesional es armoniosa",
      Mars: "Los estilos de trabajo se complementan",
      Saturn: "Hay un respeto mutuo por las responsabilidades"
    },
    square: {
      Mercury: "La comunicación laboral puede ser un desafío",
      Mars: "Los estilos de trabajo pueden crear tensión",
      Saturn: "Las responsabilidades pueden ser un punto de conflicto"
    },
    sextile: {
      Mercury: "La comunicación profesional puede mejorar",
      Mars: "Los estilos de trabajo pueden equilibrarse",
      Saturn: "Las responsabilidades pueden distribuirse mejor"
    }
  }
};

function interpretCompatibility(aspects, relationshipType) {
  const interpretations = [];
  const relevantPlanets = getRelevantPlanets(relationshipType);

  for (const aspect of aspects) {
    const [planet1, planet2] = aspect.planets;
    
    // Solo interpretar aspectos entre planetas relevantes para el tipo de relación
    if (!relevantPlanets.includes(planet1) || !relevantPlanets.includes(planet2)) {
      continue;
    }

    const interpretation = INTERPRETATIONS[relationshipType]?.[aspect.type]?.[planet1];
    if (interpretation) {
      interpretations.push({
        planets: [planet1, planet2],
        aspect: aspect.type,
        interpretation,
        harmonic: aspect.harmonic
      });
    }
  }

  return interpretations;
}

function getRelevantPlanets(relationshipType) {
  switch (relationshipType) {
    case 'romantic':
      return ['Sun', 'Moon', 'Venus', 'Mars'];
    case 'friendship':
      return ['Mercury', 'Jupiter', 'Saturn'];
    case 'work':
      return ['Mercury', 'Mars', 'Saturn'];
    default:
      return [];
  }
}

module.exports = {
  interpretCompatibility
}; 