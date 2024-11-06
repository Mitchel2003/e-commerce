import { Card, CardContent, CardFooter } from "#/ui/card"
import HeaderForm from "#/reusables/elements/HeaderForm"
import { Button } from "#/ui/button"
import { Form } from "#/ui/form"

import TechnicalCharacteristicsSection from "./TechnicalCharacteristicsSection"
import EquipmentClassificationSection from "./EquipmentClassificationSection"
import DetailsEquipmentSection from "./DetailsEquipmentSection"
import EngineerServiceSection from "./EngineerServiceSection"
import CharacteristicsSection from "./CharacteristicsSection"
import InspectionSection from "./PresetInspectionSection"
import MaintenanceSection from "./MaintenanceSection"
import AccessoriesSection from "./AccessoriesSection"
import OfficeAreaSection from "./OfficeAreaSection"
import BasicDataSection from "./BasicDataSection"

import { useQueryReact, useCustomMutation } from "@/hooks/useCurriculum"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { useCurriculumContext } from "@/context/CurriculumContext"
import { RenderFormat, SectionProps } from "@/utils/RenderFormat"
import { cn } from "@/lib/utils"

import { useNavigate, useParams } from "react-router-dom"
import { CheckSquare, Ban } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"
import { useEffect } from "react"

interface CVFormProps extends ThemeContextProps { }

const CVForm = ({ theme }: CVFormProps) => {
  const render = renderCVForm({ theme })
  const { errors } = useCurriculumContext()
  const { id = 'new' } = useParams()
  const navigate = useNavigate()
  const form = useForm()

  const mutation = useCustomMutation().createOrUpdateCV(id)
  const { data: cv, error, isLoading } = useQueryReact().fetchCV(id)

  useEffect(() => { if (mutation.isSuccess) navigate('/curriculums') }, [mutation.isSuccess])
  useEffect(() => { setInputValues() }, [cv])

  /** Function to handle onClick */
  const onSubmit = form.handleSubmit(async (values) => mutation.mutate(schemaCV(values)))
  const setInputValues = () => {
    if (!cv || id === 'new') return;
    // setValue('title', task.title);
    // setValue('description', task.description);
    // setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'));
  }
  if (error) return (<div className="bg-red-600"> <h1 className="text-white"> {error.message} </h1> </div>)
  if (isLoading) return (<h1 className="font-bold text-2xl"> Cargando... </h1>)

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>

        {/* Render errors */}
        {errors.map((e, i) => (<div key={i} className="bg-red-500 text-white"> {e} </div>))}

        {/* Component curriculum */}
        <Card
          id="curriculum-form"
          className={cn(
            'w-full max-w-6xl mx-auto shadow-lg backdrop-filter backdrop-blur-lg',
            theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
          )}
        >

          {/* -------------------- Header form -------------------- */}
          <HeaderForm
            theme={theme}
            title="CV - Equipo Biomédico"
            description="Formato de Curriculum Vitae para equipos biomedicos"
            breadcrumbs={[
              { description: "Codigo: FHV-01" },
              { description: "Vigente desde: 01/08/2019" },
              { description: "Version: 02" }
            ]}
          />

          {/* -------------------- Content form -------------------- */}
          <CardContent className="space-y-8 pt-6">
            <RenderFormat format={render} theme={theme} />
          </CardContent>

          {/* -------------------- Footer form (Buttons submit) -------------------- */}
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className={cn(
                'hover:scale-105',
                theme === 'dark'
                  ? 'bg-zinc-700 border border-zinc-600 text-zinc-100 hover:bg-zinc-900'
                  : 'bg-white border border-gray-200 text-gray-900 hover:bg-white'
              )}
            >
              <Ban className="text-red-600 mr-2 h-4 w-4" /> Cancelar
            </Button>

            <Button
              type="submit"
              className={cn(
                'hover:scale-105',
                theme === 'dark'
                  ? 'bg-zinc-700 border border-zinc-600 text-zinc-100 hover:bg-zinc-900'
                  : 'bg-white border border-gray-200 text-gray-900 hover:bg-white'
              )}
            >
              <CheckSquare className="text-green-600 mr-2 h-4 w-4" /> Guardar
            </Button>
          </CardFooter>

        </Card>
      </form>
    </Form >
  )
}

export default CVForm

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Nos ayuda a renderizar el curriculum
 * @param {string} theme Corresponde al tema en contexto
 * @returns {SectionProps[]} Arreglo de secciones del curriculum
 */
const renderCVForm = ({ theme }: ThemeContextProps): SectionProps[] => {
  return [
    { component: <OfficeAreaSection theme={theme} /> },
    { component: <BasicDataSection theme={theme} /> },
    { component: <DetailsEquipmentSection theme={theme} /> },
    { component: <EquipmentClassificationSection theme={theme} /> },
    { component: <TechnicalCharacteristicsSection theme={theme} /> },
    { component: <MaintenanceSection theme={theme} /> },
    { component: <InspectionSection theme={theme} /> },
    { component: <AccessoriesSection theme={theme} /> },
    { component: <CharacteristicsSection theme={theme} /> },
    { component: <EngineerServiceSection theme={theme} /> }
  ]
}

/**
 * Nos ayuda a construir un formato de tarea y enviar solicitudes como crear o actualizar
 * @param values es un objeto de datos que representa los campos en el contexto del formulario
 * @returns {object} un objeto que significa el esquema de tarea a utilizar en la solicitud
 */
function schemaCV(values: FieldValues): object { return { ...values } }