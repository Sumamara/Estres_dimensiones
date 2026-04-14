-- Sentencias SQL para crear la tabla Estres_dimensiones en Supabase

CREATE TABLE IF NOT EXISTS public."Estres_dimensiones" (
    id uuid NOT NULL DEFAULT uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) NOT NULL,
    user_name text NOT NULL,
    time_taken_seconds integer NOT NULL,
    total_score integer NOT NULL,
    score_100 integer NOT NULL,
    somatica_score integer NOT NULL,
    cognitiva_score integer NOT NULL,
    emocional_score integer NOT NULL,
    conductual_score integer NOT NULL,
    level text NOT NULL,
    dominant_dimension text NOT NULL,
    answers jsonb NOT NULL
);

-- Políticas de Seguridad (Restringir lectura y permitir escritura)
ALTER TABLE public."Estres_dimensiones" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir insertar a usuarios anonimos" 
ON public."Estres_dimensiones" 
FOR INSERT 
TO anon 
WITH CHECK (true);
