"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeUserOnboarding } from "../(auth)/actions";

export default function OnboardingPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { text: "1. ¿Cómo te presentas en inglés?", options: ["I am name...", "My name is...", "Me called..."], answer: 1 },
    { text: "2. Selecciona la correcta: She ___ a doctor.", options: ["am", "is", "are"], answer: 1 },
    { text: "3. ¿Cuál es el pasado del verbo 'go'?", options: ["goed", "gone", "went"], answer: 2 },
    { text: "4. I have been living here ___ 5 years.", options: ["since", "for", "during"], answer: 1 },
    { text: "5. If I ___ you, I would study more.", options: ["am", "were", "was"], answer: 1 },
    { text: "6. She asked me where ___.", options: ["did I go", "I went", "have I gone"], answer: 1 }
  ];

  const handleNext = (selectedIdx: number) => {
    // Add point if mostly correct
    if (selectedIdx === questions[step].answer) {
      setScore(score + 1);
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowResult(true);
      }, 1500);
    }
  };

  const getLevelInfo = () => {
    if (score <= 2) return { level: "A1", desc: "Principiante. Estás empezando a construir tu base. ¡Poco a poco!" };
    if (score === 3 || score === 4) return { level: "A2", desc: "Básico-Intermedio. Entiendes lo necesario, te ayudaremos a consolidar tus conocimientos." };
    if (score === 5) return { level: "B1", desc: "Intermedio. Tienes soltura y vamos a enfocarnos en la fluidez." };
    if (score >= 6) return { level: "B2+", desc: "Intermedio Alto / Avanzado. Dominas el idioma, vamos a pulir tu vocabulario y gramática compleja." };
    return { level: "A1", desc: "Principiante" };
  };

  const handleFinish = () => {
    const { level } = getLevelInfo();
    startTransition(() => {
      completeUserOnboarding(level);
    });
  };

  const handleSkip = () => {
    startTransition(() => {
      completeUserOnboarding("A1");
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4 flex-col text-on-surface">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <div className="relative z-10 w-16 h-16 border-4 border-surface-container-high border-t-primary rounded-full animate-spin"></div>
        </div>
        <h2 className="mt-8 text-2xl font-bold font-headline">Analizando tu nivel...</h2>
        <p className="mt-2 text-on-surface-variant font-body">Preparando el Atelier educativo para ti</p>
      </div>
    );
  }

  if (showResult) {
    const { level, desc } = getLevelInfo();
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-xl p-10 text-center border border-outline-variant/20">
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-primary-container text-on-primary-container mx-auto shadow-sm">
              <span className="text-4xl font-headline font-black">{level}</span>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-on-surface mb-3 font-headline">¡Prueba completada!</h2>
          <p className="text-on-surface-variant mb-10 font-body text-lg">{desc}</p>
          <button
            disabled={isPending}
            onClick={handleFinish}
            className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-full font-bold text-on-primary bg-gradient-to-r from-primary to-primary-container shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {isPending ? 'Guardando tu perfil...' : 'Ir a mi Aprendizaje'}
            {!isPending && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/20 p-8 md:p-12 relative overflow-hidden">
        
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest font-headline">
              Diagnóstico de Nivel
            </h2>
            <span className="text-sm font-bold text-on-surface-variant font-label bg-surface-container px-3 py-1 rounded-full">{step + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        
        <p className="mt-4 text-2xl md:text-3xl font-bold font-headline text-on-surface mb-10 leading-snug">{questions[step].text}</p>
        
        <div className="space-y-4">
          {questions[step].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleNext(idx)}
              className="w-full text-left p-5 rounded-xl border border-outline-variant/30 text-on-surface font-medium font-body hover:border-primary hover:bg-surface-container-low transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container-lowest text-lg"
            >
              {opt}
            </button>
          ))}
        </div>
        
        <div className="mt-12 flex justify-end items-center text-sm">
          <button disabled={isPending} className="text-outline hover:text-on-surface font-semibold font-label transition-colors disabled:opacity-50" onClick={handleSkip}>
            Saltar prueba
          </button>
        </div>
      </div>
    </div>
  );
}
