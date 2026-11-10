"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { grantXP } from "../../(auth)/actions";
import Link from "next/link";

type Exercise = {
  id: number;
  type: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
};

export default function PracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "A1";
  const topic = searchParams.get("topic") || "General Practice";

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'correct'|'incorrect'|null, message: string}>({type: null, message: ""});
  
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/lessons/generate?level=${level}&topic=${topic}`);
        if (!res.ok) throw new Error("No se pudo conectar con el Coach IA");
        const data = await res.json();
        if (data.exercises && data.exercises.length > 0) {
          setExercises(data.exercises);
        } else {
          throw new Error("Formato de lección inválido");
        }
      } catch (err: any) {
        setError(err.message || "Error al cargar la lección");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [level, topic]);

  const handleCheck = () => {
    if (!selectedOption) return;
    setIsChecking(true);

    const currentEx = exercises[currentIndex];
    const isCorrect = selectedOption === currentEx.correct_answer;

    if (isCorrect) {
      setFeedback({ type: 'correct', message: "¡Excelente! " + currentEx.explanation });
      setTimeout(() => {
        if (currentIndex < exercises.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOption(null);
          setFeedback({type: null, message: ""});
          setIsChecking(false);
        } else {
          handleWin();
        }
      }, 2500);
    } else {
      setFeedback({ type: 'incorrect', message: "Upps, no es correcto. " + currentEx.explanation });
      setLives(prev => prev - 1);
      setTimeout(() => {
        if (lives - 1 <= 0) {
          setGameOver(true);
        } else {
          setSelectedOption(null);
          setFeedback({type: null, message: ""});
          setIsChecking(false);
        }
      }, 3000);
    }
  };

  const handleWin = () => {
    setGameWon(true);
    startTransition(() => {
      grantXP(20);
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="w-16 h-16 border-4 border-surface-container-high border-t-primary rounded-full animate-spin z-10"></div>
        <div className="z-10 text-center">
          <h2 className="text-xl font-bold font-headline text-on-surface">Generando lección a medida...</h2>
          <p className="text-on-surface-variant font-body text-sm mt-2 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm animate-pulse">psychology</span>
            Entrenando modelo IA para nivel {level}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
        <div className="bg-error-container text-on-error-container p-6 rounded-2xl max-w-md text-center">
          <span className="material-symbols-outlined text-4xl mb-4">error</span>
          <h2 className="text-xl font-bold font-headline mb-2">Error de conexión</h2>
          <p className="font-body text-sm mb-6">{error}</p>
          <Link href="/dashboard" className="px-6 py-2 bg-on-error-container text-error-container rounded-full font-bold">Volver al Dashboard</Link>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
        <div className="bg-surface-container-lowest p-8 rounded-3xl max-w-md text-center border border-error/20 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-error"></div>
          <span className="material-symbols-outlined text-6xl text-error mb-4">heart_broken</span>
          <h2 className="text-3xl font-bold font-headline text-on-surface mb-2">¡Oh no!</h2>
          <p className="text-on-surface-variant font-body mb-8">Te has quedado sin vidas. Pero no te rindas, los errores son parte del aprendizaje.</p>
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1 px-6 py-3 bg-surface-container-high text-on-surface rounded-full font-bold transition-transform hover:scale-105">Salir</Link>
            <button onClick={() => window.location.reload()} className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg transition-transform hover:scale-105">Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
         
        <div className="bg-surface-container-lowest p-10 rounded-3xl max-w-md text-center border border-primary/20 shadow-2xl z-10 relative">
          <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center shadow-lg border-4 border-background">
             <span className="material-symbols-outlined text-4xl text-on-primary">military_tech</span>
          </div>
          
          <h2 className="text-3xl font-extrabold font-headline text-on-surface mt-8 mb-2">¡Lección Completada!</h2>
          <p className="text-on-surface-variant font-body mb-8">Dominaste ejercicios nivel {level}.</p>
          
          <div className="bg-surface-container p-6 rounded-2xl flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <span className="block text-3xl font-black text-primary font-headline">+20</span>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">XP Ganados</span>
            </div>
            <div className="w-px h-12 bg-outline-variant/30"></div>
            <div className="text-center flex flex-col items-center">
               <div className="flex text-error">
                 {Array.from({length: lives}).map((_, i) => <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>)}
               </div>
               <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Vidas Intactas</span>
            </div>
          </div>

          <button 
            disabled={isPending}
            onClick={() => router.push('/dashboard')} 
            className="w-full px-6 py-4 bg-primary text-on-primary rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending ? "Guardando progreso..." : "Continuar"}
          </button>
        </div>
      </div>
    );
  }

  const currentEx = exercises[currentIndex];
  
  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-40px)] bg-background md:bg-surface-container-lowest md:rounded-3xl md:m-5 md:border border-outline-variant/30 overflow-hidden relative shadow-sm">
      
      {/* Top Bar (Progress & Lives) */}
      <div className="p-6 flex items-center justify-between gap-6 z-10 bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 border-b border-outline-variant/20 md:border-none">
         <Link href="/dashboard" className="text-outline hover:text-on-surface transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container">
           <span className="material-symbols-outlined">close</span>
         </Link>
         
         <div className="flex-1">
            <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
               <div className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-500" style={{width: `${(currentIndex / exercises.length) * 100}%`}}></div>
            </div>
         </div>
         
         <div className="flex items-center gap-1 text-error font-bold font-headline">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
            <span>{lives}</span>
         </div>
      </div>

      {/* Main Card Content */}
      <div className="flex-1 overflow-y-auto px-6 py-10 md:px-20 z-10 relative">
         <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold font-headline text-on-surface mb-12 leading-tight">
               {currentEx.question}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {currentEx.options.map((opt, idx) => (
                 <button
                   key={idx}
                   disabled={isChecking}
                   onClick={() => setSelectedOption(opt)}
                   className={`p-6 rounded-2xl text-lg font-medium font-body text-left border-2 transition-all min-h-[100px] flex items-center 
                     ${selectedOption === opt 
                        ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                        : 'border-outline-variant/30 text-on-surface hover:border-primary/50 hover:bg-surface-container-low'}
                     ${isChecking && opt === currentEx.correct_answer && feedback.type === 'incorrect' ? 'border-primary ring-2 ring-primary/50 bg-primary/5' : ''}
                   `}
                 >
                   <span className="bg-surface-container-high w-8 h-8 rounded-md flex items-center justify-center text-sm mr-4 opacity-70 border border-outline-variant/20 shadow-sm">{idx + 1}</span>
                   {opt}
                   {isChecking && opt === currentEx.correct_answer && (
                     <span className="material-symbols-outlined ml-auto text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                   )}
                 </button>
               ))}
            </div>
         </div>
      </div>
      
      {/* Footer Area (Check/Continue Button) */}
      <div className={`p-6 border-t md:rounded-b-3xl transition-colors duration-300 z-20 ${
         feedback.type === 'correct' ? 'bg-primary-container/30 border-primary/20' : 
         feedback.type === 'incorrect' ? 'bg-error-container/30 border-error/20' : 
         'bg-surface-container-lowest border-outline-variant/30'
      }`}>
         <div className="max-w-4xl mx-auto flex sm:flex-row flex-col justify-between items-center gap-4">
            <div className="flex-1">
               {feedback.type && (
                 <div className="flex gap-4 items-start animate-fade-in-up">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${feedback.type === 'correct' ? 'bg-primary text-on-primary' : 'bg-error text-on-error'}`}>
                     <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>
                        {feedback.type === 'correct' ? 'celebration' : 'close'}
                     </span>
                   </div>
                   <div>
                     <h3 className={`text-xl font-bold font-headline mb-1 ${feedback.type === 'correct' ? 'text-primary' : 'text-error'}`}>
                        {feedback.type === 'correct' ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                     </h3>
                     <p className="text-on-surface-variant font-body text-sm md:text-base leading-relaxed max-w-xl">{feedback.message.replace(/^Upps, no es correcto. |^¡Excelente! /, '')}</p>
                   </div>
                 </div>
               )}
            </div>
            
            <button
               onClick={handleCheck}
               disabled={!selectedOption || isChecking}
               className={`w-full sm:w-auto px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-transform ${
                  !selectedOption ? 'bg-surface-container-high text-outline' :
                  feedback.type === 'correct' ? 'bg-primary text-on-primary' :
                  feedback.type === 'incorrect' ? 'bg-error text-on-error' :
                  'bg-primary text-on-primary hover:scale-105 active:scale-95'
               }`}
            >
               {isChecking ? 'Revisando...' : 'Comprobar'}
            </button>
         </div>
      </div>
    </div>
  );
}
