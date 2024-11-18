import HeaderCustom from "#/reusables/elements/HeaderCustom"
import ImagePreview from "#/reusables/elements/ImagePreview"
import InputField from "#/reusables/fields/Input"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"

interface EquipmentProps extends ThemeContextProps { }
const EquipmentSection = ({ theme }: EquipmentProps) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <div className="space-y-4">
        {/* -------------------- Header -------------------- */}
        <HeaderCustom
          to="component"
          theme={theme}
          title="Datos del equipo"
          className="text-2xl font-bold"
          span="Seccion auto-completada"
          iconSpan="info"
        />

        {/* -------------------- Form -------------------- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-9">

          {/* -------------------- Equipment -------------------- */}
          <div className="md:col-span-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                theme={theme}
                name="name_equipment"
                label="Nombre"
                placeholder="Nombre del equipo"
              />
              <InputField
                theme={theme}
                name="brand"
                label="Marca"
                placeholder="Marca del equipo"
              />
              <InputField
                theme={theme}
                name="model"
                label="Modelo"
                placeholder="Modelo del equipo"
              />
              <InputField
                theme={theme}
                name="serie"
                label="Serie"
                placeholder="Serie del equipo"
              />
              <InputField
                theme={theme}
                name="type_classification_medical"
                label="Clasificación Biomedica"
                placeholder="Tipo de clasificación biomedica"
              />
              <InputField
                theme={theme}
                name="state"
                label="Estado"
                placeholder="Estado del equipo"
              />
            </div>
          </div>

          {/* -------------------- Image -------------------- */}
          <div className="md:col-span-3">
            <ImagePreview
              theme={theme}
              control={methods.control}
              name="equipmentImage"
              label="Imagen equipo"
            />
          </div>

        </div>
      </div>
    </FormProvider>
  )
}

export default EquipmentSection