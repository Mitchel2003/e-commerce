import { ShoppingBag, TrendingUp, Users, type LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "#/ui/card"
import type { Product, BusinessStats, ThemeContextProps } from "@/interfaces/context.interface"
import { cn } from "@/lib/utils"

interface StatisticsSectionProps extends ThemeContextProps {
  stats?: BusinessStats
  products?: Product[]
}

const StatisticsSection = ({ theme, products, stats }: StatisticsSectionProps) => {
  const statItems = getStatsData(products, stats)
  return (
    <section className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {statItems.map((stat) => (
        <Card key={stat.key} className={cn("transition-all duration-300 ease-in-out hover:shadow-2xl group", theme === "dark"
          ? "bg-slate-800/60 border-slate-700/80 hover:border-purple-500/70 text-slate-200"
          : "bg-white border-slate-200/90 hover:border-purple-400/80 text-slate-700",
        )}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className={cn("text-base font-semibold", theme === "dark" ? "text-slate-300" : "text-slate-600")}>
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", theme === "dark" ? "text-purple-400" : "text-purple-600",)} />
            </div>
            {stat.description && (
              <CardDescription className={cn("text-xs", theme === "dark" ? "text-slate-400" : "text-slate-500")}>
                {stat.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="pb-3 pt-0">
            <div className={cn("text-3xl font-bold tracking-tight", theme === "dark" ? "text-white" : "text-slate-900")}>
              {stat.value}
            </div>
          </CardContent>
          {(stat.change || stat.footerText) && (
            <CardFooter className="pt-0 pb-3 text-xs">
              {stat.change && (
                <span
                  className={cn("flex items-center gap-1 font-medium",
                    stat.changeType === "increase"
                      ? theme === "dark"
                        ? "text-green-400"
                        : "text-green-600"
                      : theme === "dark"
                        ? "text-red-400"
                        : "text-red-500",
                  )}
                >
                  {stat.changeType === "increase"
                    ? (<ArrowUpRight className="h-3.5 w-3.5" />)
                    : (<ArrowDownRight className="h-3.5 w-3.5" />)
                  }
                  {Math.abs(stat.change)}%
                </span>
              )}
              {stat.footerText && (
                <span className={cn("ml-1", theme === "dark" ? "text-slate-500" : "text-slate-400")}>
                  {stat.footerText}
                </span>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </section>
  )
}

export default StatisticsSection
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
// Formatea un número para mostrar separadores de miles
const formatNumber = (num: number): string => new Intl.NumberFormat().format(num)
interface StatItemData {
  changeType?: "increase" | "decrease"
  description?: string
  footerText?: string
  icon: LucideIcon
  change?: number
  title: string
  value: string
  key: string
}

const getStatsData = (products?: Product[], stats?: BusinessStats): StatItemData[] => [
  {
    icon: ShoppingBag,
    key: "totalProducts",
    title: "Total Productos",
    description: "En catálogo",
    footerText: "vs mes anterior",
    value: products?.length ? formatNumber(products.length) : "0",
    change: products && products.length > 10 ? 5.2 : -1.2, // Mock change
    changeType: products && products.length > 10 ? "increase" : "decrease",
  }, {
    icon: TrendingUp,
    key: "totalVisits",
    changeType: "increase",
    description: "Este mes",
    title: "Visitas Totales",
    footerText: "vs mes anterior",
    value: stats?.totalVisits ? formatNumber(stats.totalVisits) : "0",
    change: stats && stats.totalVisits > 100 ? 12.5 : 3.1, // Mock change
  }, {
    icon: Users,
    key: "uniqueVisitors",
    description: "Este mes",
    title: "Personas que han interactuado",
    value: stats?.uniqueVisitors ? formatNumber(stats.uniqueVisitors) : "0",
    change: stats && stats.uniqueVisitors > 50 ? 8.0 : -0.5, // Mock change
    changeType: stats && stats.uniqueVisitors > 50 ? "increase" : "decrease",
    footerText: "vs mes anterior",
  }
]