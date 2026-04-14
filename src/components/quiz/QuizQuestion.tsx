"use client";

import { StressQuestion } from "./quizData";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface QuizQuestionProps {
    question: StressQuestion;
    onAnswer: (answer: number) => void;
    onBack: () => void;
    currentGlobalIndex: number;
    totalQuestions: number;
    savedAnswer?: number;
}

const QuizQuestion = ({
    question,
    onAnswer,
    onBack,
    currentGlobalIndex,
    totalQuestions,
    savedAnswer
}: QuizQuestionProps) => {
    const [selectedScore, setSelectedScore] = useState<number | null>(savedAnswer ?? null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setSelectedScore(savedAnswer ?? null);
        setIsAnimating(false);
        setIsExiting(false);
    }, [currentGlobalIndex, savedAnswer]);

    const triggerContinue = useCallback((scoreToSave: number) => {
        setIsAnimating(true);
        setIsExiting(true);
        setTimeout(() => {
            onAnswer(scoreToSave);
        }, 300); // Allow exit animation
    }, [onAnswer]);

    const handleSelect = (score: number) => {
        if (isAnimating || isExiting) return;
        setSelectedScore(score);
        // Direct auto-advance on any selection, ignoring if there's a savedAnswer.
        setTimeout(() => triggerContinue(score), 400);
    };

    const handleManualContinue = () => {
        if (selectedScore !== null && !isAnimating && !isExiting) {
            triggerContinue(selectedScore);
        }
    };

    const options = [
        { value: 1, label: "Nunca (0%)" },
        { value: 2, label: "Muy rara vez (20%)" },
        { value: 3, label: "Ocasionalmente (40%)" },
        { value: 4, label: "Frecuentemente (60%)" },
        { value: 5, label: "Muy frecuentemente (80%)" },
        { value: 6, label: "Siempre (100%)" }
    ];

    return (
        <div className={cn(
            "w-full max-w-2xl space-y-8 text-center relative px-4 transition-all duration-500 ease-in-out",
            isExiting 
                ? "animate-out fade-out slide-out-to-left-12 duration-300" 
                : "animate-in fade-in slide-in-from-right-12 duration-500"
        )}>
            {/* Progress */}
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    <button
                        onClick={onBack}
                        className="flex items-center hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentGlobalIndex === 0}
                    >
                        <ArrowLeft className="mr-1 h-3 w-3" />
                        Anterior
                    </button>
                    <span>Pregunta {currentGlobalIndex + 1} de {totalQuestions}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${((currentGlobalIndex + 1) / totalQuestions) * 100}%` }}
                    />
                </div>
            </div>

            <div className="space-y-6 pt-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                    {question.text}
                </h2>
                <p className="text-muted-foreground">Selecciona la opción que mejor describa tu caso.</p>
            </div>

            {/* Options */}
            <div className="grid gap-3 pt-6">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                            "w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 shadow-sm flex items-center justify-between",
                            selectedScore === option.value
                                ? "border-primary bg-primary/5 scale-[1.02] shadow-md ring-2 ring-primary/20 text-primary"
                                : "border-transparent bg-card hover:bg-muted/50 hover:shadow-md text-foreground/80 hover:text-foreground"
                        )}
                    >
                        <span className={cn(
                            "text-lg font-medium",
                            selectedScore === option.value ? "font-bold" : ""
                        )}>
                            {option.label}
                        </span>
                        
                        <div className={cn(
                            "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                            selectedScore === option.value 
                                ? "border-primary bg-primary" 
                                : "border-muted-foreground/30 bg-background"
                        )}>
                            {selectedScore === option.value && (
                                <div className="h-2.5 w-2.5 rounded-full bg-background" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="pt-4 h-16">
                {(selectedScore !== null && currentGlobalIndex === totalQuestions - 1) && (
                    <Button 
                        size="lg" 
                        onClick={handleManualContinue} 
                        className="w-full font-bold animate-in fade-in slide-in-from-bottom-2 duration-300"
                        disabled={isAnimating || isExiting}
                    >
                        Ver Resultados
                    </Button>
                )}
            </div>
        </div>
    );
};

export default QuizQuestion;
