import HeaderCustom from "#/reusables/elements/HeaderCustom";
import InputField from "#/reusables/fields/Input";

import { ThemeContextProps } from "@/interfaces/context.interface";
import { useForm, FormProvider } from "react-hook-form";

interface TechnicalCharacteristicsProps extends ThemeContextProps { }

const TechnicalCharacteristicsSection = ({ theme }: TechnicalCharacteristicsProps) => {
  const methods = useForm<TechnicalCharacteristicsProps>()

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* -------------------- Header -------------------- */}
        <HeaderCustom
          to="component"
          theme={theme}
          title="Características Técnicas"
          className="text-2xl font-bold"
          span="Campos opcionales"
          iconSpan="info"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InputField
            theme={theme}
            name="voltage"
            label="Voltaje"
            control={methods.control}
            placeholder="Voltaje"
          />
          <InputField
            theme={theme}
            name="amperage"
            label="Amperaje"
            control={methods.control}
            placeholder="Amperaje"
          />
          <InputField
            theme={theme}
            name="power"
            label="Potencia"
            control={methods.control}
            placeholder="Potencia"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InputField
            theme={theme}
            name="frequency"
            label="Frecuencia"
            control={methods.control}
            placeholder="Frecuencia"
          />
          <InputField
            theme={theme}
            name="capacity"
            label="Capacidad"
            control={methods.control}
            placeholder="Capacidad"
          />
          <InputField
            theme={theme}
            name="pressure"
            label="Presión (PSI)"
            control={methods.control}
            placeholder="Presión (PSI)"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InputField
            theme={theme}
            name="speed"
            label="Velocidad"
            control={methods.control}
            placeholder="Velocidad"
          />
          <InputField
            theme={theme}
            name="humidity"
            label="Humedad"
            control={methods.control}
            placeholder="Humedad"
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <InputField
              theme={theme}
              name="temperature"
              label="Temp (C°)"
              control={methods.control}
              placeholder="Temp (C°)"
            />
            <InputField
              theme={theme}
              name="weight"
              label="Peso (kg)"
              control={methods.control}
              placeholder="Peso (kg)"
            />
          </div>
        </div>

      </div>
    </FormProvider>
  )
}

export default TechnicalCharacteristicsSection