import { ReactNode } from 'react'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../(auth)/actions'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || 'Usuario'
  const email = user.email
  const initial = fullName.charAt(0).toUpperCase()

  const { data: profile } = await supabase
    .from('users')
    .select('xp, streak')
    .eq('id', user.id)
    .single()

  const streak = profile?.streak || 0
  const xp = profile?.xp || 0

  return (
    <div className="bg-background text-on-surface font-body antialiased flex min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* SideNavBar Anchor */}
      <aside className="hidden md:flex flex-col py-8 px-4 h-screen w-64 bg-slate-100 font-manrope font-medium text-sm tonal-shift-no-border fixed left-0 top-0 z-40">
        <div className="mb-10 px-2">
          <h1 className="text-xl font-black text-blue-600 font-headline">TeachAI</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary-container flex items-center justify-center text-on-primary-container font-headline font-bold shrink-0">
              {initial}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-on-surface truncate">{fullName}</p>
              <p className="text-xs opacity-70 truncate">{email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-blue-700 font-bold border-r-4 border-blue-600 hover:bg-white/50 transition-all translate-x-1 duration-300">
            <span className="material-symbols-outlined">route</span>
            <span>Path</span>
          </Link>
          <Link href="/dashboard/lessons" className="flex items-center gap-3 px-4 py-3 text-slate-500 opacity-80 hover:bg-white/50 transition-all duration-300">
            <span className="material-symbols-outlined">menu_book</span>
            <span>Lessons</span>
          </Link>
          <Link href="/dashboard/tutor" className="flex items-center gap-3 px-4 py-3 text-slate-500 opacity-80 hover:bg-white/50 transition-all duration-300">
            <span className="material-symbols-outlined">smart_toy</span>
            <span>AI Tutor</span>
          </Link>
          <Link href="/dashboard/leaderboard" className="flex items-center gap-3 px-4 py-3 text-slate-500 opacity-80 hover:bg-white/50 transition-all duration-300">
            <span className="material-symbols-outlined">emoji_events</span>
            <span>Ranking</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 opacity-80 hover:bg-white/50 transition-all duration-300">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </Link>
          
          <form action={logout} className="w-full mt-4">
            <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 text-error opacity-80 hover:bg-error-container hover:text-on-error-container transition-all duration-300 rounded-md">
              <span className="material-symbols-outlined">logout</span>
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </nav>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 lg:p-12 w-full pt-12 md:pt-10">
        {/* Header Section */}
        <header className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Mi Aprendizaje</h2>
            <p className="text-on-surface-variant font-medium">Continúa tu camino hacia la fluidez, {fullName}.</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-outline">Current Streak</p>
              <p className="text-xl font-headline font-bold text-tertiary flex items-center justify-end gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                {streak} Days
              </p>
            </div>
            <div className="text-right ml-4">
              <p className="text-xs font-bold uppercase tracking-wider text-outline">Experience</p>
              <p className="text-xl font-headline font-bold text-primary flex items-center justify-end gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                {xp} XP
              </p>
            </div>
          </div>
        </header>
        
        {children}
      </main>

      {/* Mobile Navigation Shell (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-50/90 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-outline-variant/20">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-blue-700 font-semibold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
          <span className="text-[10px]">Path</span>
        </Link>
        <Link href="/dashboard/lessons" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-[10px]">Lessons</span>
        </Link>
        <Link href="/dashboard/tutor" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="text-[10px]">AI Tutor</span>
        </Link>
        <Link href="/dashboard/leaderboard" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">emoji_events</span>
          <span className="text-[10px]">Ranking</span>
        </Link>
        <Link href="/dashboard/settings" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px]">Config</span>
        </Link>
      </nav>
    </div>
  )
}
