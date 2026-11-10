import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

export default async function LessonsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('users')
    .select('current_level')
    .eq('id', user?.id)
    .single()

  const level = profile?.current_level || 'A1'

  const units = [
    { id: 1, title: "Introducción y Saludos", desc: "Aprende lo básico para presentarte.", icon: "waving_hand", progress: 65, active: true },
    { id: 2, title: "El Restaurante", desc: "Vocabulario vital para sobrevivir con hambre.", icon: "restaurant", progress: 0, active: false },
    { id: 3, title: "En la Oficina", desc: "Comunícate profesionalmente.", icon: "work", progress: 0, active: false },
    { id: 4, title: "Narrando el Pasado", desc: "Tiempos verbales irregulares y anécdotas.", icon: "history_edu", progress: 0, active: false },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-6">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-on-surface mb-2">Syllabus de {level}</h1>
          <p className="text-on-surface-variant font-body">Tu camino de aprendizaje sugerido por la IA.</p>
        </div>
        <Link href={`/dashboard/practice?topic=Repaso General&level=${level}`} className="bg-primary-container text-on-primary-container font-bold px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">shuffle</span>
            Práctica Aleatoria
        </Link>
      </div>

      <div className="space-y-6 relative">
          {/* Vertical progress line */}
          <div className="absolute left-[39px] top-6 bottom-6 w-1 bg-surface-container-high rounded-full -z-10"></div>
          
          {units.map((unit, idx) => (
             <div key={idx} className={`bg-surface-container-lowest p-6 rounded-3xl border shadow-sm flex items-center gap-6 transition-all ${unit.active ? 'border-primary shadow-md hover:border-primary/80 hover:shadow-lg' : 'border-outline-variant/20 opacity-70 hover:opacity-100'}`}>
                
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-sm z-10 ${unit.active ? 'bg-primary text-on-primary border-surface-container-lowest' : 'bg-surface-container text-on-surface-variant border-surface-container-lowest'}`}>
                   <span className="material-symbols-outlined text-3xl">{unit.icon}</span>
                </div>
                
                <div className="flex-1">
                   <h2 className="text-xl font-bold font-headline text-on-surface mb-1">Unidad {unit.id}: {unit.title}</h2>
                   <p className="text-sm font-body text-on-surface-variant mb-4">{unit.desc}</p>
                   
                   {unit.active ? (
                     <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{width: `${unit.progress}%`}}></div>
                     </div>
                   ) : (
                     <span className="text-xs font-bold text-outline-variant uppercase tracking-widest flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">lock</span> Bloqueado
                     </span>
                   )}
                </div>
                
                <div className="pl-4 border-l border-outline-variant/20">
                   {unit.active ? (
                     <Link href={`/dashboard/practice?topic=Unidad ${unit.id} ${unit.title}&level=${level}`} className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                     </Link>
                   ) : (
                     <button disabled className="w-14 h-14 bg-surface-container text-outline-variant rounded-full flex items-center justify-center cursor-not-allowed">
                        <span className="material-symbols-outlined">lock</span>
                     </button>
                   )}
                </div>
                
             </div>
          ))}
      </div>
    </div>
  );
}
