const localHoroscopes = {
  aries: {
    description: "Hoy es un día propicio para tomar decisiones importantes. La energía de Marte te impulsa a actuar con determinación.",
    compatibility: "Leo",
    mood: "Energético y decidido",
    color: "Rojo",
    luckyNumber: "7",
    luckyTime: "14:00"
  },
  tauro: {
    description: "La estabilidad será tu mejor aliada hoy. Tómate tu tiempo para analizar las situaciones antes de actuar.",
    compatibility: "Virgo",
    mood: "Práctico y estable",
    color: "Verde",
    luckyNumber: "4",
    luckyTime: "10:00"
  },
  geminis: {
    description: "Tu mente estará especialmente activa hoy. Aprovecha para aprender algo nuevo o iniciar proyectos creativos.",
    compatibility: "Libra",
    mood: "Curioso y comunicativo",
    color: "Amarillo",
    luckyNumber: "5",
    luckyTime: "16:00"
  },
  cancer: {
    description: "Las emociones estarán a flor de piel. Escucha tu intuición y confía en tus sentimientos.",
    compatibility: "Escorpio",
    mood: "Sensible y protector",
    color: "Plateado",
    luckyNumber: "2",
    luckyTime: "20:00"
  },
  leo: {
    description: "Tu carisma estará en su punto más alto. Aprovecha para liderar y motivar a los demás.",
    compatibility: "Sagitario",
    mood: "Confidente y generoso",
    color: "Dorado",
    luckyNumber: "1",
    luckyTime: "12:00"
  },
  virgo: {
    description: "La atención al detalle será tu fortaleza hoy. Organiza tus tareas y verás resultados excelentes.",
    compatibility: "Capricornio",
    mood: "Analítico y meticuloso",
    color: "Verde oliva",
    luckyNumber: "6",
    luckyTime: "09:00"
  },
  libra: {
    description: "El equilibrio será clave en tus relaciones hoy. Busca soluciones que beneficien a todas las partes.",
    compatibility: "Acuario",
    mood: "Diplomático y armonioso",
    color: "Rosa",
    luckyNumber: "3",
    luckyTime: "18:00"
  },
  escorpio: {
    description: "Tu intuición estará especialmente aguda. Confía en tu instinto para tomar decisiones importantes.",
    compatibility: "Piscis",
    mood: "Intenso y perceptivo",
    color: "Rojo oscuro",
    luckyNumber: "8",
    luckyTime: "22:00"
  },
  sagitario: {
    description: "La aventura te llama. Es un buen día para explorar nuevas posibilidades y expandir tus horizontes.",
    compatibility: "Aries",
    mood: "Optimista y aventurero",
    color: "Púrpura",
    luckyNumber: "9",
    luckyTime: "15:00"
  },
  capricornio: {
    description: "Tu disciplina y perseverancia darán frutos hoy. Mantén el enfoque en tus objetivos a largo plazo.",
    compatibility: "Tauro",
    mood: "Ambicioso y práctico",
    color: "Negro",
    luckyNumber: "10",
    luckyTime: "08:00"
  },
  acuario: {
    description: "Tu mente innovadora estará en su mejor momento. Comparte tus ideas revolucionarias con el mundo.",
    compatibility: "Géminis",
    mood: "Innovador y original",
    color: "Azul eléctrico",
    luckyNumber: "11",
    luckyTime: "17:00"
  },
  piscis: {
    description: "La creatividad fluirá naturalmente hoy. Permítete soñar y expresar tus emociones a través del arte.",
    compatibility: "Cáncer",
    mood: "Empático y creativo",
    color: "Azul marino",
    luckyNumber: "12",
    luckyTime: "21:00"
  }
};

export async function getDailyHoroscope(sign) {
  try {
    // Intentar obtener datos de la API
    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener el horóscopo');
    }
    
    const data = await response.json();
    return {
      sign: sign,
      date: data.current_date,
      description: data.description,
      compatibility: data.compatibility,
      mood: data.mood,
      color: data.color,
      luckyNumber: data.lucky_number,
      luckyTime: data.lucky_time
    };
  } catch (error) {
    console.warn('Usando datos locales debido a error en la API:', error);
    // Usar datos locales como respaldo
    const localData = localHoroscopes[sign.toLowerCase()];
    return {
      sign: sign,
      date: new Date().toLocaleDateString('es-ES'),
      description: localData.description,
      compatibility: localData.compatibility,
      mood: localData.mood,
      color: localData.color,
      luckyNumber: localData.luckyNumber,
      luckyTime: localData.luckyTime
    };
  }
}

export async function getSignCompatibility(sign1, sign2) {
  try {
    const response = await fetch(`https://aztro.sameerkumar.website/compatibility?sign1=${sign1}&sign2=${sign2}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener la compatibilidad');
    }
    
    const data = await response.json();
    return {
      sign1: sign1,
      sign2: sign2,
      compatibility: data.compatibility,
      description: data.description
    };
  } catch (error) {
    console.warn('Usando datos locales para compatibilidad:', error);
    // Datos locales de compatibilidad
    return {
      sign1: sign1,
      sign2: sign2,
      compatibility: "Buena",
      description: "La compatibilidad entre estos signos es favorable. Comparten valores y objetivos similares."
    };
  }
}

// Función para obtener el signo zodiacal basado en la fecha de nacimiento
export function getZodiacSign(day, month) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'tauro';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'geminis';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'escorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagitario';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricornio';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'acuario';
  return 'piscis';
} 