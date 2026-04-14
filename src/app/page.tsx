"use client";

import QuizEngine from "@/components/quiz/QuizEngine";

export default function Home() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full flex items-center justify-center">
                    <QuizEngine />
                </div>
            </main>
        </div>
    );
}
