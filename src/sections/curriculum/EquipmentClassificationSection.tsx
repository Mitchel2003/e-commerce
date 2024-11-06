import HeaderCustom from "#/reusables/elements/HeaderCustom"
import CheckboxField from "#/reusables/fields/Checkbox"
import SelectField from "#/reusables/fields/Select"
import { Separator } from "#/ui/separator"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"

interface EquipmentClassProps extends ThemeContextProps { }

const EquipmentClassificationSection = ({ theme }: EquipmentClassProps) => {
  const methods = useForm<EquipmentClassProps>()

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* -------------------- Header -------------------- */}
        <HeaderCustom
          to="component"
          theme={theme}
          title="Clasificación del Equipo"
          className="text-2xl font-bold"
          span="Informacion sensible"
          iconSpan="warn"
        />

        {/* classification */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <SelectField
            theme={theme}
            control={methods.control}
            label="Tipo"
            name="type_device"
            placeholder="Seleccionar tipo"
            options={['fijo', 'movil']}
          />
          <SelectField
            theme={theme}
            control={methods.control}
            name="classification_by_use"
            label="Clasificación por Uso"
            placeholder="Seleccionar clasificación"
            options={['medico', 'basico', 'apoyo']}
          />
          <SelectField
            theme={theme}
            control={methods.control}
            name="classification_biomedical"
            label="Clasificación Biomédica"
            placeholder="Seleccionar clasificación"
            options={['diagnostico', 'tratamiento', 'prevencion', 'rehabilitacion', 'analisis']}
          />
          <SelectField
            theme={theme}
            control={methods.control}
            name="risk"
            label="Riesgo"
            placeholder="Seleccionar riesgo"
            options={['muy_alto', 'alto', 'moderado', 'bajo']}
          />
        </div>

        {/* technology and power supply */}
        <div className="flex flex-col md:flex-row">
          <CheckboxField
            theme={theme}
            isMultiple={true}
            control={methods.control}
            label="Fuentes de alimentacion"
            options={['agua', 'aire', 'gas', 'vapor', 'electricidad']}
          />

          {/* separator vertial to md */}
          <div className="hidden md:flex justify-center items-center px-6 mx-auto">
            <Separator
              orientation="vertical"
              className={`h-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}
            />
          </div>

          {/* separator horizontal to sm */}
          <div className="flex md:hidden justify-center items-center py-6">
            <Separator
              orientation="horizontal"
              className={`w-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}
            />
          </div>


          <CheckboxField
            theme={theme}
            isMultiple={true}
            control={methods.control}
            label="Tecnología Predominante"
            options={['mecanico', 'electrico', 'electronico', 'hidraulico', 'neumatico']}
          />
        </div>

      </div>
    </FormProvider >
  )
}

export default EquipmentClassificationSection