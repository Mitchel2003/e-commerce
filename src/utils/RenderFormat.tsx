import { Fragment, ReactElement, cloneElement } from "react"
import { useThemeContext } from "@/context/ThemeContext"
import { Separator } from "#/ui/separator"

/*--------------------------------------------------tools--------------------------------------------------*/
export interface FormatSectionProps { format: ReactElement[] }
export const RenderFormat = ({ format }: FormatSectionProps) => {
  const { theme } = useThemeContext()

  return format.map((e, i) => (
    <Fragment key={i}>
      {cloneElement(e)}
      <Separator className={`my-8 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`} />
    </Fragment>
  ))
}
/*---------------------------------------------------------------------------------------------------------*/