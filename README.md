# 🧠 Cuestionario de Estrés y Agotamiento (CP-EA)

Una aplicación interactiva para identificar la respuesta de tu sistema nervioso frente a la presión y predecir el riesgo de burnout. Mide 4 dimensiones principales del estrés mediante 16 preguntas precisas.

## 🎯 Las 4 Dimensiones

| Dimensión | Enfoque | Evaluación |
|---|---|---|
| **❤️ Somática** | Cuerpo y Biología | Mide la activación del sistema nervioso y respuesta inflamatoria física (ej. dolores, tensión). |
| **🧠 Cognitiva** | Percepción de Control | Mide la carga mental y el funcionamiento de la corteza prefrontal ante la incertidumbre. |
| **💓 Emocional** | Activación y Reactividad | Mide la ventana de tolerancia y el estado de hipersensibilidad en la amígdala. |
| **⚡ Conductual** | Modos de Supervivencia | Identifica el lenguaje de estrés, mecanismos de huida, lucha, y congelamiento. |

## 🌟 Características

- **Evaluación Clara** — 16 preguntas con escala de intensidad visual.
- **Gráfico de Precisión** — Visualización con animaciones para medir tu nivel de estrés en escala de 0 a 100.
- **Resultados Detallados** — Resumen visual de cuál es tu principal fuente de tensión y barras de progreso por dimensión.
- **Animaciones Premium** — Transiciones elegantes y feedback visual al seleccionar.
- **Base de Datos** — Diseño de esquema SQL escalable para Supabase (`Estres_dimensiones`).

## 🛠️ Tecnologías

- **Frontend**: React, Next.js, TypeScript
- **Estilos**: Tailwind CSS, Shadcn UI (Accordion, Buttons, Inputs), Lucide React
- **Backend**: Supabase (PostgreSQL)
- **Animaciones**: TailwindCSS Animate / Transiciones Nativas

## 🚀 Instalación y Despliegue

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno (.env)
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key

# Ejecutar en desarrollo
npm run dev
```

El proyecto está configurado para poder utilizar una ruta base a través de la variable de entorno `RUTA_BASE` en caso de requerirlo (por ejemplo, para despliegues en subdirectorios en Netlify).
