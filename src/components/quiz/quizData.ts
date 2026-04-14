export interface StressQuestion {
    id: number;
    text: string;
    dimensionId: 'somatica' | 'cognitiva' | 'emocional' | 'conductual';
}

export interface StressDimension {
    id: 'somatica' | 'cognitiva' | 'emocional' | 'conductual';
    title: string;
    description: string;
    dominantAnalysis: string;
    shortLabel: string;
}

export const stressDimensions: Record<string, StressDimension> = {
    somatica: {
        id: 'somatica',
        title: "Dimensión Somática",
        shortLabel: "Somática",
        description: "Mide la activación del sistema nervioso autónomo y la respuesta inflamatoria física.",
        dominantAnalysis: "Hay Somatización. Tu cuerpo ya está sufriendo el impacto biológico (inflamación). Es crítico atender el sueño y la nutrición."
    },
    cognitiva: {
        id: 'cognitiva',
        title: "Dimensión Cognitiva",
        shortLabel: "Cognitiva",
        description: "Mide la carga mental, la percepción de control y el funcionamiento de la corteza prefrontal.",
        dominantAnalysis: "Tu problema principal es la Percepción de Incertidumbre. Necesitas herramientas de gestión de control y priorización."
    },
    emocional: {
        id: 'emocional',
        title: "Dimensión Emocional",
        shortLabel: "Emocional",
        description: "Mide la ventana de tolerancia y el estado de activación o reactividad de la amígdala.",
        dominantAnalysis: "Estás en Hiperalerta. Tu amígdala está hipersensible. Requiere técnicas de calma emocional y reducción de estímulos."
    },
    conductual: {
        id: 'conductual',
        title: "Dimensión Conductual",
        shortLabel: "Conductual",
        description: "Identifica tu lenguaje del estrés predominante y cómo reaccionas en el día a día.",
        dominantAnalysis: "Estás en Modo Supervivencia Activo. Tus respuestas de Lucha/Huida/Congelación están dictando tu conducta diaria."
    }
};

export const stressQuestions: StressQuestion[] = [
    // Somática
    { id: 1, dimensionId: 'somatica', text: "¿Sientes tensión muscular persistente (cuello, mandíbula, hombros) incluso cuando intentas descansar?" },
    { id: 2, dimensionId: 'somatica', text: "¿Sufres de problemas digestivos (hinchazón, reflujo, cambios en el tránsito) sin una causa médica clara?" },
    { id: 3, dimensionId: 'somatica', text: "¿Tu calidad de sueño es pobre (dificultad para conciliar, despertares nocturnos o sensación de cansancio al despertar)?" },
    { id: 4, dimensionId: 'somatica', text: "¿Experimentas dolores de cabeza, palpitaciones o fatiga crónica que no mejora con el reposo?" },
    // Cognitiva
    { id: 5, dimensionId: 'cognitiva', text: "¿Con qué frecuencia te has sentido afectado por algo que sucedió inesperadamente?" },
    { id: 6, dimensionId: 'cognitiva', text: "¿Con qué frecuencia has sentido que no podías controlar las cosas importantes en tu vida?" },
    { id: 7, dimensionId: 'cognitiva', text: "¿Con qué frecuencia te has sentido nervioso o 'estresado'?" },
    { id: 8, dimensionId: 'cognitiva', text: "¿Con qué frecuencia has sentido que las dificultades se acumulan tanto que no puedes superarlas?" },
    // Emocional
    { id: 9, dimensionId: 'emocional', text: "¿Te ha resultado difícil relajarte o 'bajar revoluciones'?" },
    { id: 10, dimensionId: 'emocional', text: "¿Has tendido a reaccionar de forma exagerada a las situaciones (ej. irritabilidad repentina)?" },
    { id: 11, dimensionId: 'emocional', text: "¿Has sentido que estabas muy sensible o que cualquier cosa te alteraba?" },
    { id: 12, dimensionId: 'emocional', text: "¿Has sentido una sensación de pánico o de que algo terrible iba a suceder sin razón aparente?" },
    // Conductual
    { id: 13, dimensionId: 'conductual', text: "¿Has evitado tareas o personas porque te sentías incapaz de manejar la interacción?" },
    { id: 14, dimensionId: 'conductual', text: "¿Has recurrido a comportamientos de 'escape' (scrolling infinito, comer por ansiedad, procrastinación rígida)?" },
    { id: 15, dimensionId: 'conductual', text: "¿Te has sentido tan abrumado/a que te has quedado 'congelado/a' sin saber por dónde empezar?" },
    { id: 16, dimensionId: 'conductual', text: "¿Has descuidado tus límites personales (decir que sí a todo o trabajar en exceso para calmar la ansiedad)?" }
];

export const getStressProfile = (scores: Record<string, number>) => {
    // Calculamos puntuación total (min 16, max 96)
    const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
    
    // Escala al 100%
    const score100 = Math.round(((totalScore - 16) / 80) * 100);

    // Identificar nivel
    let levelTitle = "";
    let levelDescription = "";
    let levelColor = "";

    if (totalScore <= 36) {
        levelTitle = "Estrés Eutrés/Leve";
        levelDescription = "Tu sistema nervioso está operando dentro de su ventana de tolerancia. Los desafíos te estimulan pero no te desbordan.";
        levelColor = "text-emerald-500";
    } else if (totalScore <= 56) {
        levelTitle = "Estrés Moderado";
        levelDescription = "Estás entrando en la zona de 'supervivencia'. Tu cuerpo está enviando señales claras de que los recursos se están agotando. Es vital revisar la carga mental.";
        levelColor = "text-amber-500";
    } else {
        levelTitle = "Estrés Alto / Al borde del Burnout";
        levelDescription = "Tu sistema está en modo 'emergencia' constante. Hay una alta probabilidad de inflamación sistémica y desregulación neuroendocrina. Requiere intervención inmediata.";
        levelColor = "text-rose-500";
    }

    // Identificar dimensión dominante (la más alta)
    const sortedDimensions = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const dominantDimensionId = sortedDimensions[0][0] as keyof typeof stressDimensions;
    const dominantDimension = stressDimensions[dominantDimensionId];

    return {
        totalScore,
        score100,
        levelTitle,
        levelDescription,
        levelColor,
        dominantDimension,
        sortedDimensions
    };
};
