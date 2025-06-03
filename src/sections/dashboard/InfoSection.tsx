import { Business, ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'

interface InfoSectionProps extends ThemeContextProps { business: Business }
const InfoSection = ({ theme, business }: InfoSectionProps) => {
  const complement = business?.name?.slice(1).toLowerCase() ?? ""
  const first = business?.name?.charAt(0).toUpperCase() ?? ""
  const businessName = business?.name ? `${first}${complement}` : "Usuario"

  return (
    <section
      className={cn("p-6 md:p-8 rounded-xl shadow-xl overflow-hidden relative", theme === "dark"
        ? "bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 text-slate-100"
        : "bg-gradient-to-br from-slate-50 via-purple-100 to-rose-50 text-slate-800",
      )}
    >
      {/* Decorative elements */}
      <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20", theme === "dark" ? "bg-purple-400" : "bg-purple-300")} />
      <div className={cn("absolute -bottom-12 -left-12 w-40 h-40 rounded-lg opacity-10 rotate-45", theme === "dark" ? "bg-pink-500" : "bg-pink-300")} />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className={cn("text-3xl md:text-4xl font-bold tracking-tight", theme === "dark"
              ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300"
              : "text-slate-900",
            )}>
              ¡Hola, {businessName}!
            </h1>
            <p className={cn("text-md md:text-lg mt-2 max-w-2xl",
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            )}>
              Bienvenido a tu centro de control. Gestiona, analiza y haz crecer tu negocio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection