import Link from 'next/link'
import { login } from '../actions'

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6 selection:bg-primary-fixed selection:text-on-primary-fixed pt-16 pb-16">
      <main className="w-full max-w-md relative">
        {/* Floating Abstract Elements for "Digital Atelier" feel */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden p-8 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="mb-6 flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-primary">TeachAI</span>
            </div>
            <h1 className="text-3xl font-bold text-on-surface text-center leading-tight tracking-tight font-headline">Bienvenido de nuevo</h1>
            <p className="text-on-surface-variant text-center mt-2 font-medium font-body">Continúa tu viaje de aprendizaje hoy.</p>
          </div>

          {searchParams?.error && (
            <div className="mb-6 bg-error-container p-4 rounded-lg border-l-4 border-error">
              <p className="text-sm font-semibold text-on-error-container">{searchParams.error}</p>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" action={login}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1 font-label" htmlFor="email">Correo electrónico</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                <input required className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none font-body" id="email" name="email" placeholder="nombre@ejemplo.com" type="email" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-sm font-semibold text-on-surface-variant font-label" htmlFor="password">Contraseña</label>
                <a className="text-xs font-bold text-primary hover:text-primary-container transition-colors font-label" href="#">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input required className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none font-body" id="password" name="password" placeholder="••••••••" type="password" />
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all duration-200" type="submit">
              Ingresar
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface-container-lowest text-outline font-medium">o</span>
            </div>
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-low text-on-surface font-semibold rounded-full transition-all duration-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Ingresar con Google
          </button>

          {/* Footer Link */}
          <p className="text-center mt-10 text-on-surface-variant font-medium font-body">
            ¿No tienes una cuenta? 
            <Link className="text-primary font-bold hover:underline underline-offset-4 ml-1" href="/register">Crear una cuenta</Link>
          </p>
        </div>

        {/* Secondary Graphic Section (Visual Anchor) */}
        <div className="mt-8 grid grid-cols-3 gap-4 opacity-50 px-2">
          <div className="h-1.5 bg-primary/20 rounded-full"></div>
          <div className="h-1.5 bg-secondary/20 rounded-full"></div>
          <div className="h-1.5 bg-tertiary/20 rounded-full"></div>
        </div>
      </main>

      {/* Support Icons Floating (Decorative) */}
      <div className="fixed bottom-8 right-8 hidden md:flex items-center gap-4 z-50">
        <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-outline-variant/10 flex items-center justify-center text-primary-container cursor-pointer hover:bg-white transition-all">
          <span className="material-symbols-outlined">help_outline</span>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-outline-variant/10 flex items-center justify-center text-primary-container cursor-pointer hover:bg-white transition-all">
          <span className="material-symbols-outlined">language</span>
        </div>
      </div>
    </div>
  )
}
