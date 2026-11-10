import Link from 'next/link'
import { createClient } from '../../lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('current_level, xp, streak')
    .eq('id', user.id)
    .single()

  const level = profile?.current_level || 'A1'
  const xp = profile?.xp || 0
  const streak = profile?.streak || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Progress Card (Unit 1) - Large spanning card */}
      <section className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest mb-3">En Curso</span>
              <h3 className="text-2xl font-headline font-bold mb-1 text-on-surface">Tu Nivel Actual: {level}</h3>
              <p className="text-on-surface-variant text-sm font-body">Fundamentos adaptados a tu diagnóstico.</p>
            </div>
            <div className="bg-surface-container-low p-3 rounded-lg flex items-center justify-center text-center flex-col gap-1">
              <span className="material-symbols-outlined text-primary text-3xl">stars</span>
              <span className="text-xs font-bold text-primary">{xp} XP</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-semibold text-on-surface">Progreso General</span>
              <span className="text-2xl font-headline font-black text-primary">65%</span>
            </div>
            <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-[65%]"></div>
            </div>
            <div className="flex gap-6 pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                <span className="text-xs font-medium text-on-surface">8/12 Lecciones</span>
              </div>
              <div className="flex items-center gap-2 text-tertiary">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span className="text-xs font-bold">{streak} {streak === 1 ? 'día' : 'días'} de racha</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-4 relative z-10">
          <Link href={`/dashboard/practice?level=${level}&topic=Unidad 1 Introduccion`} className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-transform active:scale-95 inline-block">Continuar Práctica</Link>
          <Link href="/dashboard/lessons" className="bg-surface-container-low text-on-surface px-6 py-3 rounded-full font-bold text-sm hover:bg-surface-container-high transition-all outline outline-1 outline-outline-variant/50 flex items-center justify-center">Ver Syllabus</Link>
        </div>
      </section>

      {/* Misiones Diarias - Side Panel */}
      <section className="md:col-span-4 space-y-6">
        <div className="bg-surface-container-low rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline font-bold text-lg text-on-surface">Misiones Diarias</h3>
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div className="space-y-4">
            {/* Mission 1 */}
            <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 group cursor-pointer border border-transparent hover:border-primary/20 transition-all hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-lg">record_voice_over</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">Habla 5 min con el tutor</p>
                <p className="text-[10px] text-on-surface-variant font-body">Práctica de fluidez oral</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
            </div>
            
            {/* Mission 2 */}
            <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 group cursor-pointer border border-transparent transition-all">
              <div className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">fact_check</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface opacity-50 line-through">Completa 2 lecciones</p>
                <p className="text-[10px] text-on-surface-variant font-body">Gana 20 XP</p>
              </div>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>

            {/* Mission 3 */}
            <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 opacity-60">
              <div className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center text-outline-variant">
                <span className="material-symbols-outlined text-lg">history_edu</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">Escribe un diario</p>
                <p className="text-[10px] text-on-surface-variant font-body">Misión desbloqueable</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant">lock</span>
            </div>
          </div>
        </div>

        {/* Promo/Status Glass Card */}
        <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer">
          <img alt="learning community" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-4d72bxKhKumi1jjW81k9N7E7RETwhfEy1gdt3jeNTZnknJOZhjQg2_wgVMVD8MmVQTRCP_lWf-8Zv0v28rausDuCE06BXuTHp9223-SNY6Mct4UfKPanipQXoaxcHxqYzRMwWuUjwzCKtnJeq3YWfPQFvTvCgc15vbySHwV-E-7inGm7Vt2wvpKC5dj0RR_mFB_QuIcb6PLTZNjlNCrK7mMZK4g5NSw6wxEtDYDmyic2eXenx6S5EHM5TfVdTCMcKSwpcTSNdA" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed">Siguiente Evento</p>
            <p className="text-lg font-headline font-bold">Club de Conversación</p>
            <p className="text-xs opacity-80 font-body">Hoy a las 18:00 • En vivo</p>
          </div>
        </div>
      </section>

      {/* Repaso Recomendado - Wide Horizontal Layout */}
      <section className="md:col-span-12 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline font-bold text-xl text-on-surface">Repaso Recomendado</h3>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            Ver todo <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Review Item 1 */}
          <div className="bg-surface-container-low rounded-xl p-5 border border-transparent hover:border-primary/20 hover:bg-surface-container-lowest transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-tertiary">translate</span>
            </div>
            <h4 className="font-bold text-base mb-1 text-on-surface">Verbos Irregulares</h4>
            <p className="text-xs text-on-surface-variant mb-4 font-body">Hace 3 días • Nivel Crítico</p>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full w-[30%] rounded-full"></div>
            </div>
          </div>
          
          {/* Review Item 2 */}
          <div className="bg-surface-container-low rounded-xl p-5 border border-transparent hover:border-primary/20 hover:bg-surface-container-lowest transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary">hearing</span>
            </div>
            <h4 className="font-bold text-base mb-1 text-on-surface">Pronunciación 'th'</h4>
            <p className="text-xs text-on-surface-variant mb-4 font-body">Hace 1 día • Reforzar</p>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[85%] rounded-full"></div>
            </div>
          </div>
          
          {/* Review Item 3 */}
          <div className="bg-surface-container-low rounded-xl p-5 border border-transparent hover:border-primary/20 hover:bg-surface-container-lowest transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-secondary">forum</span>
            </div>
            <h4 className="font-bold text-base mb-1 text-on-surface">Slang Corporativo</h4>
            <p className="text-xs text-on-surface-variant mb-4 font-body">Hace 5 días • Expandir</p>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[60%] rounded-full"></div>
            </div>
          </div>
          
          {/* AI Suggestion Glass Card */}
          <div className="glass-morphism rounded-xl p-5 flex flex-col items-center justify-center text-center border-dashed border-2 border-outline-variant bg-surface-container-highest/30">
            <span className="material-symbols-outlined text-primary mb-2 text-4xl">psychology</span>
            <p className="text-sm font-bold text-on-surface px-4">¿Quieres un repaso con AI?</p>
            <Link href="/dashboard/tutor" className="mt-4 text-[10px] font-black text-primary uppercase tracking-widest hover:scale-105 transition-transform bg-primary/10 px-3 py-1.5 rounded-full">Hablar ahora</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
