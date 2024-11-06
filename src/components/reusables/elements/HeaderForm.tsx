import { Card, CardDescription, CardHeader, CardTitle } from "#/ui/card"

import { HeaderBreadcrumbProps } from "@/interfaces/form.interface"
import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "./HeaderCustom"
import { cn } from "@/lib/utils"

interface HeaderFormProps extends ThemeContextProps {
  title: string
  description: string
  className?: string
  breadcrumbs?: HeaderBreadcrumbProps[]
}
const HeaderForm = ({
  theme,
  title,
  description,
  breadcrumbs,
  className
}: HeaderFormProps) => {
  return (
    <>
      {/* -------------------- Header form -------------------- */}
      <Card
        className={cn(
          'border-none rounded-lg rounded-b-none shadow-none',
          theme === 'dark' ? 'bg-zinc-950/40' : 'bg-zinc-300/30',
          className
        )}
      >
        <HeaderText
          theme={theme}
          title={title}
          description={description}
        />
      </Card >

      {/* -------------------- Breadcrumbs -------------------- */}
      {breadcrumbs && (
        <Card
          className={cn(
            'border-none rounded-none shadow-none',
            theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-200/30'
          )}
        >
          <div className="flex p-2 justify-between">
            {breadcrumbs.map((breadcrumb, index) => (
              <HeaderCustom
                key={index}
                to="component"
                theme={theme}
                className="text-sm"
                title={breadcrumb.description}
              />
            ))}
          </div>
        </Card >
      )}
    </>
  )
}

export default HeaderForm
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface HeaderTextProps extends ThemeContextProps {
  title: string,
  description: string
}
const HeaderText = ({ title, description, theme }: HeaderTextProps) => {
  return (
    <CardHeader className="space-y-1">
      <CardTitle
        className={cn(
          'text-2xl font-bold text-center',
          theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
        )}
      >
        {title}
      </CardTitle>

      <CardDescription
        className={cn(
          'text-center',
          theme === 'dark'
            ? 'text-zinc-400'
            : 'text-gray-500'
        )}
      >
        {description}
      </CardDescription>
    </CardHeader>
  )
}