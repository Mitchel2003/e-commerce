import { ControllerRenderProps } from "react-hook-form"
import { SetStateAction, Dispatch } from "react"
import { LucideIcon } from "lucide-react"

//items actions to dropdown (data-table)
export interface ActionProps {
  label: string
  icon: LucideIcon
  className?: string
  onClick: () => void | Promise<void>
}


/*useCallback (react)*/
export type UseCallbackProps = {
  field: ControllerRenderProps<any, string>;
  setPreview: Dispatch<SetStateAction<string | null>>;
}

// /*useQuery and useMutation*/
// export type QueryReact_CV = {//to curriculum
//   fetchCV: (id: string) => UseQueryResult<Curriculum, Error>
//   fetchCVs: () => UseQueryResult<Curriculum[], Error>
// }
// export type CustomMutation_CV = {
//   createOrUpdateCV: (id: string) => UseMutationResult<Curriculum, Error, object, unknown>
//   deleteCV: () => UseMutationResult<Curriculum, Error, string, unknown>
// }