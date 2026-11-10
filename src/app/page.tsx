import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm tonal-shift-no-border">
        <div className="flex justify-between items-center px-6 py-3 w-full mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary font-headline">TeachAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link className="text-primary font-semibold font-label" href="/dashboard">Dashboard</Link>
            <Link className="text-on-surface-variant hover:bg-surface-container-low transition-colors px-3 py-1 rounded-full font-label" href="/login">Conectarse</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-all">account_circle</Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <h1 className="text-5xl lg:text-7xl font-extrabold font-headline leading-tight tracking-tight text-on-surface mb-6">
                Aprende inglés conversando con <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">Inteligencia Artificial</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl font-body leading-relaxed">
                Mejora tu fluidez con un tutor virtual disponible 24/7. Diseñado para hispanohablantes que buscan una experiencia de inmersión real y personalizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="inline-block text-center px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95 duration-200">
                  Empieza Gratis
                </Link>
                <Link href="#features" className="inline-block text-center px-8 py-4 bg-surface-container-lowest text-primary font-bold rounded-full border border-outline-variant/15 hover:bg-surface-container-low transition-all">
                  Ver Cómo Funciona
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img alt="User 1" className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA34XDVHiDSQ-6rJgrRTozceheygZCP-PeThqaqefp4vA_2JQwUn7fq-lIiu3x5q6pyvavCE0C78EGdPJ21PaDITD7oWMN3H9m61bdRHk6qt-SLaSOoPZlGD_j0hZ6bnSqPE7EH5Oqhhn9_TeTPkUOSKLGhzchGD1VJLsWS3xqVWoInSgN_ErnARAxOSm9qfw0sav27V32k5H3kjIx-Bp5fREwMRIMHp58WEd6p-JA2rhpVaCUbd3cW7HR-vgF1wR4K7b_0QaSpdw" />
                  <img alt="User 2" className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgvNL-SCxQ-Qnu7aqf7Ivo9CPanPMcJ_pgMcA5mOCFKOYd4ZiIePIGYKejTZFs-l-bCiBsIyg3Js6tBNIYGahUCM3JSiH6uSs3dC6eqrXoTpRWutbE6sGnH_sAKOiRFR7e4MkzoAhf85HPv6YWf1uqV7Ra4UZZUThrqA--83TU06Z7O9pBpqo6ohsD2lBrIEHxQb_xjtbJHuzPSrBsJqzSlZIUqvvLtbHoVLsNazSN9aT7T2dX19OYyARlx0sc9sBWRxKHK3eriA" />
                  <img alt="User 3" className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO-N0FTCCFLzmRzmozGVLz8UzuPCoDLZEwZKHwBgbwnIUlfONBy3kFP8rZR_O3i-w0MoEunxPk7StABz8kpV44tVbQL7r3cGJyG1PFeRWVkynS2LcwbM-Du4747ZAOhz32UV0gmqhKg33diptagQ30LoMpBSH7FIs5VYaC0NlvRQVmQUnI8X_ZMq9P1eZY7D2syeguY5Ej5gsPFq6wQkzgsWypcIm_BROcqruW3tBBJ10-OgcOZHRTznYIV2uVxCk3IBKQmGuaaA" />
                </div>
                <p className="text-sm text-on-surface-variant font-medium">+10,000 estudiantes practicando hoy</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
              {/* Hero Visual: AI Interface Card */}
              <div className="relative glass-morphism rounded-3xl p-6 shadow-2xl border border-white/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary">smart_toy</span>
                  </div>
                  <div>
                    <h3 className="font-bold font-headline text-on-surface">TeachAI Tutor</h3>
                    <p className="text-xs text-secondary font-medium">Online • Listo para hablar</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-surface-container-high p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                      <p className="text-sm font-body text-on-surface">Hi! How are you doing today? Ready for our daily mission about travel scenarios?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                      <p className="text-sm font-body">¡Hola! Yes, I'm ready. Can we practice checking into a hotel?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-surface-container-high p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                      <p className="text-sm font-body text-on-surface">Excellent choice. "Of course, let's start. 'Welcome to The Atelier, do you have a reservation?'"</p>
                      <div className="mt-2 pt-2 border-t border-outline-variant/20">
                        <p className="text-xs italic text-on-surface-variant">Tip: Usa "I'd like to check in" para empezar formalmente.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 bg-surface-container-lowest rounded-full p-2 flex items-center shadow-inner">
                  <div className="flex-grow px-4 text-outline text-sm">Escribe o habla...</div>
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined">mic</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 px-6 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold font-headline text-on-surface mb-4">El Atelier de tu Aprendizaje</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Tecnología de punta aplicada a la pedagogía del lenguaje para hispanohablantes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
              {/* Feature 1: AI Conversation */}
              <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4">forum</span>
                  <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">Conversación Natural</h3>
                  <p className="text-on-surface-variant max-w-sm">Habla con fluidez sobre cualquier tema. Nuestra IA entiende el contexto y corrige tus errores en tiempo real sin interrumpir el flujo.</p>
                </div>
                <img alt="AI Waves" className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1ua3KDxhmhRW5tCKbpp0vXr3b1BoeUDwwduN1c8PDx8yCycn8WgmhsVGwvVH30nprJvRbal1QkkiveZKMPYCKLkfeFRUfkxqGTN19irneuX2jYeagaJ4YyRWtgQazJ7i3IG7hLqBJw8TlHLhqEVG4Kcdp_g6DDDPR7xzOmauD7F4zOYcJ-Jhe6Am9R_uXRtRAHm2axv_tDzZllHdiJGmNKQPvwr1rXJAQAUIYyHbTCyZe-9GjgfkU7w80uX7u9xiNaYfFuGexuQ" />
              </div>
              {/* Feature 2: Multimodal */}
              <div className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-4xl mb-4">translate</span>
                  <h3 className="text-2xl font-bold font-headline mb-2">Multimodal</h3>
                  <p className="opacity-80">Practica lectura, escucha y habla simultáneamente con soporte visual integrado.</p>
                </div>
                <div className="flex items-center gap-2 font-bold text-sm">
                  EXPLORA AHORA <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
              {/* Feature 3: Adaptive Learning */}
              <div className="md:col-span-4 bg-surface-container-highest rounded-3xl p-8 flex flex-col">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">trending_up</span>
                <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">Aprendizaje Adaptativo</h3>
                <p className="text-on-surface-variant text-sm">Cada lección se ajusta a tu nivel actual y tus intereses personales.</p>
              </div>
              {/* Feature 4: Feedback */}
              <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-8 flex items-center gap-8 border border-outline-variant/10">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">Feedback de Precisión</h3>
                  <p className="text-on-surface-variant">Recibe reportes detallados sobre tu gramática, pronunciación y vocabulario después de cada sesión.</p>
                </div>
                <div className="hidden sm:block flex-shrink-0 w-48 h-32 bg-surface-container rounded-2xl p-4">
                  <div className="h-2 w-full bg-secondary-container rounded-full mb-3"></div>
                  <div className="h-2 w-3/4 bg-primary-container rounded-full mb-3"></div>
                  <div className="h-2 w-1/2 bg-outline-variant rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold font-headline text-on-primary mb-6">
                ¿Listo para hablar inglés con confianza?
              </h2>
              <p className="text-on-primary/80 text-lg mb-10 max-w-2xl mx-auto">
                Únete hoy y obtén acceso ilimitado a tu tutor personal. Sin horarios, sin presiones, solo tú y tu progreso.
              </p>
              <Link href="/register" className="inline-block px-10 py-5 bg-surface-container-lowest text-primary rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-transform">
                Empieza Gratis Ahora
              </Link>
              <p className="mt-6 text-on-primary/60 text-sm">No se requiere tarjeta de crédito</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2">
            <span className="text-2xl font-bold tracking-tight text-primary font-headline mb-6 block">TeachAI</span>
            <p className="text-on-surface-variant max-w-xs mb-8">Redefiniendo la educación de idiomas a través de la inteligencia artificial y el diseño centrado en el humano.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" href="#">
                <span className="material-symbols-outlined text-xl">language</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" href="#">
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold font-headline text-on-surface mb-6">Producto</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/tutor">Tutor AI</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/dashboard/lessons">Lecciones</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Precios</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold font-headline text-on-surface mb-6">Compañía</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><Link className="hover:text-primary transition-colors" href="#">Sobre Nosotros</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Carreras</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 text-center text-on-surface-variant text-xs">
          © 2024 TeachAI. Todos los derechos reservados. Diseñado para el futuro de la educación.
        </div>
      </footer>
    </>
  );
}
