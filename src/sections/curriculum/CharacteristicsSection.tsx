import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import AreaField from "#/reusables/fields/Area"


interface CharacteristicsProps extends ThemeContextProps { }

const CharacteristicsSection = ({ theme }: CharacteristicsProps) => {
  
  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Características"
        className="text-2xl font-bold"
        span="Maximo 100 caracteres"
        iconSpan="warn"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AreaField
          theme={theme}
          name="characteristics"
          label="Características"
          placeholder="Ingrese las características del equipo"
        />
        <AreaField
          theme={theme}
          name="recommendations_manufacturer"
          label="Recomendaciones del Fabricante"
          placeholder="Ingrese las recomendaciones del fabricante"
        />
      </div>
    </div>
  )
}

export default CharacteristicsSection