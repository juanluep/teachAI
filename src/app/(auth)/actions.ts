'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '../../lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  let error: any = null
  try {
    const res = await supabase.auth.signInWithPassword(data)
    error = res.error
  } catch (e: any) {
    error = e
  }

  if (error) {
    if (error.message && error.message.includes('fetch failed')) {
      revalidatePath('/', 'layout')
      redirect('/dashboard')
    }
    redirect('/login?error=Could+not+authenticate')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const name = formData.get('name') as string

  if (password !== confirmPassword) {
    redirect('/register?error=Las+contraseñas+no+coinciden')
  }

  let error: any = null
  try {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    })
    error = res.error
  } catch (e: any) {
    error = e
  }

  if (error) {
    // Fallback de desarrollo: Si la BBDD está apagada, pasamos al onboarding para poder probar la UI
    if (error.message && error.message.includes('fetch failed')) {
      revalidatePath('/', 'layout')
      redirect('/onboarding')
    }
    redirect('/register?error=Could+not+create+user')
  }

  revalidatePath('/', 'layout')
  redirect('/onboarding')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function deleteAccount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.id) {
    redirect('/login')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('localhost', 'host.docker.internal') || ''
  const adminClient = createServerClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return [] },
        setAll() {}
      }
    }
  )

  await adminClient.auth.admin.deleteUser(user.id)
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function completeUserOnboarding(level: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.id) {
    redirect('/login')
  }

  // Se asume que el backend disparó el trigger y la fila ya existe
  const { error } = await supabase
    .from('users')
    .update({ 
      current_level: level,
      onboarding_completed: true,
      last_activity_date: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    console.error("Error setting onboarding level:", error)
  }

  revalidatePath('/', 'layout')
  revalidatePath('/dashboard', 'page')
  redirect('/dashboard')
}

export async function grantXP(amount: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.id) return { success: false, error: 'Unauthorized' }

  // Fetch current xp
  const { data: profile, error: profileErr } = await supabase
    .from('users')
    .select('xp, last_activity_date, streak')
    .eq('id', user.id)
    .single()

  if (profileErr) return { success: false, error: profileErr }

  const currentXp = profile?.xp || 0
  const lastActive = profile?.last_activity_date ? new Date(profile.last_activity_date) : null
  const now = new Date()
  
  let newStreak = profile?.streak || 0
  
  // Basic streak calc (if last activity was yesterday, increment. If today, keep same. Otherwise 1)
  if (!lastActive) {
    newStreak = 1
  } else {
    // Zero out hours to compare days roughly
    const lastDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate())
    const thisDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    // Difference in days
    const diffTime = Math.abs(thisDay.getTime() - lastDay.getTime())
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      newStreak += 1
    } else if (diffDays > 1) {
      newStreak = 1
    }
  }

  const { error: updateErr } = await supabase
    .from('users')
    .update({ 
      xp: currentXp + amount,
      streak: newStreak,
      last_activity_date: now.toISOString()
    })
    .eq('id', user.id)

  if (updateErr) {
    return { success: false, error: updateErr }
  }

  revalidatePath('/dashboard', 'page')
  return { success: true, newXp: currentXp + amount, newStreak }
}
