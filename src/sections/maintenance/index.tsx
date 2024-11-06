import HeaderForm from "#/reusables/elements/HeaderForm"
import { Card, CardContent, CardFooter } from "#/ui/card"
import { Button } from "#/ui/button"
import { Form } from "#/ui/form"

import ReferenceEquipmentSection from "./ReferenceEquipmentSection"
import EngineerServiceSection from "./EngineerServiceSection"
import MaintenanceSection from "./MaintenanceSection"
import ObservationSection from "./ObservationSection"
import InspectionSection from "./InspectionSection"
import EquipmentSection from "./EquipmentSection"
import ClientSection from "./ClientSection"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { RenderFormat, SectionProps } from "@/utils/RenderFormat"
import { CheckSquare, Ban } from "lucide-react"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"

interface MaintenanceProps extends ThemeContextProps { }
const Maintenance = ({ theme }: MaintenanceProps) => {
  const form = useForm()

  const renderMaintenance: SectionProps[] = [
    { component: <ClientSection theme={theme} /> },
    { component: <ReferenceEquipmentSection theme={theme} /> },
    { component: <EquipmentSection theme={theme} /> },
    { component: <MaintenanceSection theme={theme} /> },
    { component: <InspectionSection theme={theme} /> },
    { component: <ObservationSection theme={theme} /> },
    { component: <EngineerServiceSection theme={theme} /> }
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>

        {/* Component maintenance */}
        <Card className={cn(
          'w-full max-w-6xl mx-auto shadow-lg backdrop-filter backdrop-blur-lg',
          theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
        )}>

          {/* -------------------- Header form -------------------- */}
          <HeaderForm
            theme={theme}
            title="Proceso de calidad - Equipos biomedicos"
            description="Formato de mantenimiento preventivo y correctivo"
            breadcrumbs={[
              { description: "Codigo Formato: FMP-RL-01" },
              { description: "Versión: 02" }
            ]}
          />

          {/* -------------------- Content form -------------------- */}
          <CardContent className="space-y-8 pt-6">
            <RenderFormat format={renderMaintenance} theme={theme} />
          </CardContent>

          {/* -------------------- Footer form (Buttons submit) -------------------- */}
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className={`hover:scale-105
                ${theme === 'dark'
                  ? 'bg-zinc-700 border border-zinc-600 text-zinc-100 hover:bg-zinc-900'
                  : 'bg-white border border-gray-200 text-gray-900 hover:bg-white'
                }`}
            >
              <Ban className="text-red-600 mr-2 h-4 w-4" /> Cancelar
            </Button>

            <Button
              type="submit"
              className={`hover:scale-105
                ${theme === 'dark'
                  ? 'bg-zinc-700 border border-zinc-600 text-zinc-100 hover:bg-zinc-900'
                  : 'bg-white border border-gray-200 text-gray-900 hover:bg-white'
                }`}
            >
              <CheckSquare className="text-green-600 mr-2 h-4 w-4" /> Guardar
            </Button>
          </CardFooter>

        </Card>
      </form>
    </Form >
  )
}

export default Maintenance