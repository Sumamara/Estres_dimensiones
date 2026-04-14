"use client";

import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import QuizWelcome from "./QuizWelcome";
import { stressQuestions, getStressProfile } from "./quizData";
import { supabase } from "@/integrations/supabase/client";

const QuizEngine = () => {
    const totalQuestions = stressQuestions.length;

    const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(totalQuestions).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [userName, setUserName] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);

    const handleStart = (name: string) => {
        setUserName(name);
        setHasStarted(true);
        setStartTime(Date.now());
    };

    const currentQuestion = stressQuestions[currentGlobalIndex];

    const calculateScores = (finalAnswers: (number | null)[]) => {
        const scores: Record<string, number> = { somatica: 0, cognitiva: 0, emocional: 0, conductual: 0 };
        finalAnswers.forEach((ans, index) => {
            if (ans !== null && ans !== undefined) {
                const question = stressQuestions[index];
                scores[question.dimensionId] += ans;
            }
        });
        return scores;
    };

    const saveResults = async (finalAnswers: (number | null)[]) => {
        if (!startTime) return;

        const endTime = Date.now();
        const timer = Math.floor((endTime - startTime) / 1000);
        const finalScores = calculateScores(finalAnswers);
        const profile = getStressProfile(finalScores);

        try {
            const resultsData: any = {
                user_name: userName,
                time_taken_seconds: timer,
                total_score: profile.totalScore,
                score_100: profile.score100,
                somatica_score: finalScores.somatica,
                cognitiva_score: finalScores.cognitiva,
                emocional_score: finalScores.emocional,
                conductual_score: finalScores.conductual,
                level: profile.levelTitle,
                dominant_dimension: profile.dominantDimension.id,
                answers: finalAnswers
            };

            const { error } = await supabase.from("Estres_dimensiones").insert([resultsData]);
            if (error) throw error;
        } catch (error) {
            console.error("Error al guardar resultados:", error);
        }
    };

    const handleAnswer = (answer: number) => {
        const newAnswers = [...answers];
        newAnswers[currentGlobalIndex] = answer;
        setAnswers(newAnswers);

        if (currentGlobalIndex < totalQuestions - 1) {
            setCurrentGlobalIndex(currentGlobalIndex + 1);
        } else {
            saveResults(newAnswers);
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (currentGlobalIndex > 0) {
            setCurrentGlobalIndex(currentGlobalIndex - 1);
        }
    };

    const handleRetake = () => {
        setAnswers(new Array(totalQuestions).fill(null));
        setCurrentGlobalIndex(0);
        setShowResult(false);
        setHasStarted(false);
        setStartTime(null);
    };

    if (!hasStarted) {
        return <QuizWelcome onStart={handleStart} />;
    }

    if (showResult) {
        return <QuizResult scores={calculateScores(answers)} onRetake={handleRetake} userName={userName} />;
    }

    return (
        <div className="w-full flex justify-center min-h-[450px]">
            <QuizQuestion
                key={currentGlobalIndex}
                question={currentQuestion}
                onAnswer={handleAnswer}
                onBack={handleBack}
                currentGlobalIndex={currentGlobalIndex}
                totalQuestions={totalQuestions}
                savedAnswer={answers[currentGlobalIndex] !== null ? answers[currentGlobalIndex]! : undefined}
            />
        </div>
    );
};

export default QuizEngine;
