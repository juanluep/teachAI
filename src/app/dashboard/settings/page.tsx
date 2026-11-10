"use client";

import { deleteAccount } from '../../(auth)/actions'

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold font-headline text-on-surface">Configuración de la Cuenta</h2>
        <p className="mt-1 text-sm text-on-surface-variant font-body">
          Gestiona tus preferencias y la privacidad de tu cuenta de TeachAI.
        </p>
      </div>

      <div className="bg-surface-container-low shadow-sm rounded-xl border border-outline-variant/20 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-container text-on-primary-container flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined">settings_suggest</span>
          </div>
          <h3 className="text-xl font-headline font-bold text-on-surface">Preferencias (Próximamente)</h3>
        </div>
        <p className="text-sm font-body text-on-surface-variant ml-[3.25rem]">Opciones de notificaciones, idioma de interfaz y temas estarán disponibles muy pronto.</p>
      </div>

      <div className="bg-error-container/30 shadow-sm rounded-xl border border-error/20 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-error text-on-error flex items-center justify-center rounded-lg shadow-sm">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-error">Zona de Peligro: Eliminar Cuenta</h3>
          </div>
          <div className="ml-[3.25rem]">
            <div className="text-sm font-body text-on-error-container space-y-3 mb-6">
              <p>
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de que realmente deseas hacerlo.
              </p>
              <p>
                Toda tu información, rachas, progreso de lecciones y XP serán borrados permanentemente de nuestros servidores (Cascading Delete).
              </p>
            </div>
            <form action={deleteAccount}>
              <button
                type="submit"
                className="bg-error text-on-error px-6 py-3 rounded-md font-bold text-sm shadow-sm hover:scale-105 transition-transform active:scale-95 flex items-center gap-2"
                onClick={(e) => {
                  if (!confirm("¿Estás absolutamente seguro de que deseas eliminar tu cuenta y todos tus datos? Esta acción es irreversible.")) {
                    e.preventDefault();
                  }
                }}
              >
                <span className="material-symbols-outlined text-sm">delete_forever</span>
                Sí, eliminar mi cuenta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
