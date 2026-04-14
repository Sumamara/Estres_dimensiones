"use client";

import { getStressProfile, stressDimensions } from "./quizData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity, Brain, HeartPulse, Zap, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface QuizResultProps {
    scores: Record<string, number>;
    onRetake: () => void;
    userName?: string;
}

const DIMENSION_CONFIG: Record<string, { icon: any; colorClass: string; bgClass: string; barClass: string }> = {
    somatica: { icon: Activity, colorClass: "text-red-500", bgClass: "bg-red-500/10", barClass: "bg-red-500" },
    cognitiva: { icon: Brain, colorClass: "text-blue-500", bgClass: "bg-blue-500/10", barClass: "bg-blue-500" },
    emocional: { icon: HeartPulse, colorClass: "text-amber-500", bgClass: "bg-amber-500/10", barClass: "bg-amber-500" },
    conductual: { icon: Zap, colorClass: "text-emerald-500", bgClass: "bg-emerald-500/10", barClass: "bg-emerald-500" },
};

const QuizResult = ({ scores, onRetake, userName }: QuizResultProps) => {
    const profile = getStressProfile(scores);

    // Calculate circumference for stroke-dasharray (r=80 -> c=2*pi*80 = 502)
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (profile.score100 / 100) * circumference;

    const DominantIcon = DIMENSION_CONFIG[profile.dominantDimension.id].icon;

    return (
        <div className="w-full max-w-4xl animate-fade-in text-center space-y-12 pb-20 px-4">
            
            {/* Header & Global Score */}
            <div className="space-y-6 pt-6">
                <p className="text-sm font-bold uppercase tracking-widest text-primary/80">
                    {userName ? `Hola ${userName}, ` : ""}tu nivel de estrés es:
                </p>

                <div className="flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center w-64 h-64">
                        {/* Background Circle */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle
                                className="text-muted/30 stroke-current"
                                strokeWidth="16"
                                cx="128"
                                cy="128"
                                r={radius}
                                fill="transparent"
                            />
                            {/* Animated Progress Circle */}
                            <circle
                                className={cn("stroke-current transition-all duration-1000 ease-out", profile.levelColor)}
                                strokeWidth="16"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                cx="128"
                                cy="128"
                                r={radius}
                                fill="transparent"
                            />
                        </svg>
                        
                        <div className="absolute flex flex-col items-center justify-center space-y-1">
                            <span className={cn("text-6xl font-black tabular-nums tracking-tighter", profile.levelColor)}>
                                {profile.score100}
                            </span>
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">/ 100</span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2 max-w-md">
                        <h2 className={cn("text-3xl font-black tracking-tight", profile.levelColor)}>
                            {profile.levelTitle}
                        </h2>
                        <p className="text-muted-foreground text-sm/relaxed">
                            {profile.levelDescription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Dominant Dimension Analysis */}
            <div className="bg-card border rounded-3xl p-8 shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <AlertTriangle className="w-48 h-48" />
                </div>
                
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                        <Info className="h-5 w-5" />
                        Tu principal fuente de tensión
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className={cn(
                            "p-4 rounded-2xl shrink-0 flex items-center justify-center",
                            DIMENSION_CONFIG[profile.dominantDimension.id].bgClass,
                            DIMENSION_CONFIG[profile.dominantDimension.id].colorClass
                        )}>
                            <DominantIcon className="w-10 h-10" />
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black">
                                {profile.dominantDimension.title}
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {profile.dominantDimension.dominantAnalysis}
                            </p>
                            <p className="text-sm text-muted-foreground/80 italic border-l-2 pl-4 mt-2">
                                {profile.dominantDimension.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dimension Breakdown */}
            <div className="space-y-6 text-left">
                <h3 className="font-bold text-xl text-center">Desglose por Dimensiones</h3>
                
                <div className="grid gap-4 max-w-2xl mx-auto">
                    {profile.sortedDimensions.map(([id, score]) => {
                        const dimension = stressDimensions[id as keyof typeof stressDimensions];
                        const config = DIMENSION_CONFIG[id];
                        const Icon = config.icon;
                        const percentage = Math.round(((score - 4) / 20) * 100); // min 4, max 24 per dimension

                        return (
                            <Accordion key={id} type="single" collapsible className="w-full bg-card border rounded-2xl shadow-sm">
                                <AccordionItem value={id} className="border-b-0 px-4 py-2">
                                    <AccordionTrigger className="hover:no-underline py-2">
                                        <div className="flex flex-col md:flex-row items-center gap-4 w-full pr-4 text-left">
                                            <div className={cn("p-3 rounded-xl shrink-0 mt-2 md:mt-0", config.bgClass, config.colorClass)}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            
                                            <div className="flex-1 w-full space-y-2 mt-2 md:mt-0">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-foreground text-lg">{dimension.title}</span>
                                                    <span className="font-mono text-sm font-bold text-muted-foreground whitespace-nowrap ml-4">
                                                        {score} / 24 pts
                                                    </span>
                                                </div>
                                                
                                                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                                    <div 
                                                        className={cn("h-full rounded-full transition-all duration-1000 ease-out", config.barClass)}
                                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4 pb-2 text-muted-foreground text-base leading-relaxed pl-2 md:pl-16">
                                        {dimension.description}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <Button variant="outline" size="lg" onClick={onRetake} className="text-muted-foreground hover:text-foreground hover:bg-muted">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a realizar el test
                </Button>
            </div>
        </div>
    );
};

export default QuizResult;
