"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, ShieldAlert, HeartPulse } from "lucide-react";
import { Input } from "@/components/ui/input";

interface QuizWelcomeProps {
    onStart: (name: string) => void;
}

const QuizWelcome = ({ onStart }: QuizWelcomeProps) => {
    const [name, setName] = useState("");

    const handleStart = () => {
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-12 text-center p-8 bg-card border rounded-[2rem] shadow-sm">

                <div className="space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2">
                        <BrainCircuit className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                        Cuestionario de <span className="text-primary">Estrés y Agotamiento</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                        Identifica cómo tu cuerpo y mente están respondiendo a la presión, e identifica si estás al borde del burnout.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                    <div className="p-6 bg-muted/30 rounded-2xl border flex items-start gap-4">
                        <HeartPulse className="w-8 h-8 text-rose-500 shrink-0" />
                        <div>
                            <h3 className="font-bold mb-1">Mide el impacto real</h3>
                            <p className="text-sm text-muted-foreground">Evalúa dimensiones somáticas, cognitivas, emocionales y conductuales.</p>
                        </div>
                    </div>
                    <div className="p-6 bg-muted/30 rounded-2xl border flex items-start gap-4">
                        <ShieldAlert className="w-8 h-8 text-amber-500 shrink-0" />
                        <div>
                            <h3 className="font-bold mb-1">Diagnóstico Rápido</h3>
                            <p className="text-sm text-muted-foreground">Solo 16 preguntas precisas sobre tu estado reciente.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/20 p-6 rounded-2xl border max-w-2xl mx-auto text-left">
                    <h3 className="font-bold mb-3">Instrucciones:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Sé honesto/a y no le des muchas vueltas a cada pregunta.</li>
                        <li>No hay respuestas correctas o incorrectas.</li>
                    </ul>
                </div>

                <div className="max-w-sm mx-auto space-y-6 pt-4">
                    <div className="space-y-2 text-left">
                        <label htmlFor="name" className="text-sm font-bold text-foreground">
                            ¿Cómo te llamas?
                        </label>
                        <Input
                            id="name"
                            placeholder="Ingresa tu nombre..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                            className="h-12 text-lg rounded-xl"
                        />
                    </div>

                    <Button
                        size="lg"
                        onClick={handleStart}
                        className="w-full h-14 text-lg font-bold rounded-xl"
                        disabled={!name.trim()}
                    >
                        Comenzar Evaluación
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default QuizWelcome;
