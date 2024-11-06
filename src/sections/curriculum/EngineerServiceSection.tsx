import ImagePreview from '#/reusables/elements/ImagePreview'
import HeaderCustom from '#/reusables/elements/HeaderCustom'
import InputField from '#/reusables/fields/Input'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { useForm } from 'react-hook-form'

interface EngineerServiceProps extends ThemeContextProps { }

const EngineerServiceSection = ({ theme }: EngineerServiceProps) => {
  const form = useForm<EngineerServiceProps>()

  return (
    <div className="space-y-6">
      {/* -------------------- Header -------------------- */}
      <HeaderCustom
        to="component"
        theme={theme}
        title="Ingeniero de Servicio"
        className='text-2xl font-bold'
        span="Ingeniero asociado a la creacion del formato"
        iconSpan="info"
      />

      {/* -------------------- Engineer service -------------------- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-2 col-span-1">
          <InputField
            theme={theme}
            name="service_engineer"
            label="Ingeniero de Servicio"
            control={form.control}
            placeholder="Ingeniero responsable"
          />
          <InputField
            theme={theme}
            name="invima_registration"
            label="Registro INVIMA"
            control={form.control}
            placeholder="Ingrese el registro asociado"
          />
        </div>

        {/* -------------------- Image preview -------------------- */}
        <ImagePreview
          theme={theme}
          control={form.control}
          name="logo_client"
          label="Logotipo del cliente asociado"
        />
      </div>
    </div>
  )
}

export default EngineerServiceSection