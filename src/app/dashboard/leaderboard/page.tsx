import { createClient } from '../../../lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: users, error } = await supabase
    .from('users')
    .select('id, display_name, xp, streak, current_level')
    .order('xp', { ascending: false })
    .limit(50)

  if (error) {
    console.error("Error fetching leaderboard", error);
  }

  const topUsers = users || [];
  const myRankIndex = topUsers.findIndex(u => u.id === user.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface">Global Leaderboard</h1>
        <p className="text-on-surface-variant font-medium mt-1">
          Compite de forma sana. ¿Quién tiene más XP?
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/30 bg-surface-container-low/50 font-bold text-xs uppercase tracking-wider text-on-surface-variant">
          <div className="col-span-2 md:col-span-1 text-center">Rango</div>
          <div className="col-span-6 md:col-span-5">Estudiante</div>
          <div className="hidden md:block md:col-span-3 text-center">Nivel CEFR</div>
          <div className="col-span-4 md:col-span-3 text-right pr-4">Total XP</div>
        </div>

        {/* List */}
        <div className="divide-y divide-outline-variant/20">
          {topUsers.map((u, index) => {
            const isMe = u.id === user.id;
            const rank = index + 1;
            
            // Medals for top 3
            let rankDisplay = <span className="font-bold text-on-surface-variant">{rank}</span>;
            if (rank === 1) rankDisplay = <span className="text-2xl" title="1st Place">🥇</span>;
            else if (rank === 2) rankDisplay = <span className="text-2xl" title="2nd Place">🥈</span>;
            else if (rank === 3) rankDisplay = <span className="text-2xl" title="3rd Place">🥉</span>;

            return (
              <div 
                key={u.id} 
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-surface-container-low/30 ${
                  isMe ? 'bg-primary-container/20 border-l-4 border-primary' : 'border-l-4 border-transparent'
                }`}
              >
                <div className="col-span-2 md:col-span-1 text-center flex items-center justify-center">
                  {rankDisplay}
                </div>
                
                <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
                    rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-slate-400' : rank === 3 ? 'bg-amber-600' : 'bg-primary/80'
                  }`}>
                    {u.display_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="overflow-hidden">
                    <p className={`font-bold truncate ${isMe ? 'text-primary' : 'text-on-surface'}`}>
                      {u.display_name || 'Usuario Anónimo'}
                    </p>
                    {isMe && <p className="text-[10px] uppercase font-bold text-primary tracking-wide">Tú</p>}
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-3 items-center justify-center">
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold font-headline">
                    {u.current_level || 'A1'}
                  </span>
                  {u.streak > 2 && (
                    <span className="ml-2 flex items-center text-tertiary font-bold text-xs" title={`${u.streak} day streak!`}>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      {u.streak}
                    </span>
                  )}
                </div>

                <div className="col-span-4 md:col-span-3 text-right pr-4 flex flex-col justify-center items-end">
                  <span className="font-headline font-extrabold text-lg text-on-surface">
                    {u.xp || 0}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">XP</span>
                </div>
              </div>
            );
          })}

          {topUsers.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant">
              Aún no hay estudiantes en la tabla de clasificación.
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Summary for current user if they aren't top 50 (Fallback) */}
      {myRankIndex === -1 && (
         <div className="mt-6 p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex justify-between items-center">
           <span className="font-medium text-on-surface-variant">Tu posición quedó fuera del Top 50. ¡Sigue practicando!</span>
           <span className="font-bold text-primary">Sigue subiendo de nivel</span>
         </div>
      )}
    </div>
  )
}
