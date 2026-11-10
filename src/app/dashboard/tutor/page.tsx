import { createClient } from '../../../lib/supabase/server'
import { redirect } from 'next/navigation'
import ChatInterface from '../../../components/ChatInterface'

export default async function TutorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('current_level')
    .eq('id', user.id)
    .single()

  const level = profile?.current_level || 'A1'

  return (
    <div className="max-w-4xl mx-auto h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold text-on-surface">Práctica con IA</h1>
        <p className="text-on-surface-variant text-sm mt-1">El tutor ajustará su nivel de complejidad automáticamente a tu progreso.</p>
      </div>
      <ChatInterface level={level} />
    </div>
  )
}
