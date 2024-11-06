import { Task, Curriculum, ThemeContextProps } from "@/interfaces/context.interface"
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query"
import { ControllerRenderProps } from "react-hook-form"

import { SetStateAction, Dispatch, ReactNode } from "react"
/*--------------------------------------------------Layout--------------------------------------------------*/
export type LayoutProps = (children: ReactNode) => JSX.Element
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Component Props--------------------------------------------------*/
//interface defautl props
export interface Props { children?: ReactNode }

//sidebar
export interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  subItems?: NavItemProps[]
}

//theme components
export interface LoginComponentsProps extends ThemeContextProps { }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Task--------------------------------------------------*/
export type TaskFunction = (tasks: Task[], favorite: string[]) => ReactNode

export type FavoriteTaskState = {
  favoriteTaskIds: string[];
  addFavoriteTask: (id: string) => void;
  removeFavoriteTask: (id: string) => void;
}
export type TaskCardProps = { task: Task, isFavorite: boolean }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------hooks--------------------------------------------------*/
/*useCallback (react)*/
export type UseCallbackProps = {
  field: ControllerRenderProps<any, string>;
  setPreview: Dispatch<SetStateAction<string | null>>;
}

/*useQuery and useMutation*/
export type QueryReact_Task = {//to task
  fetchTask: (id: string) => UseQueryResult<Task, Error>
  fetchTasks: () => UseQueryResult<Task[], Error>
}
export type CustomMutation_Task = {
  createOrUpdateTask: (id: string) => UseMutationResult<Task, Error, object, unknown>
  deleteTask: () => UseMutationResult<Task, Error, string, unknown>
}
export type QueryReact_CV = {//to curriculum
  fetchCV: (id: string) => UseQueryResult<Curriculum, Error>
  fetchCVs: () => UseQueryResult<Curriculum[], Error>
}
export type CustomMutation_CV = {
  createOrUpdateCV: (id: string) => UseMutationResult<Curriculum, Error, object, unknown>
  deleteCV: () => UseMutationResult<Curriculum, Error, string, unknown>
}
/*---------------------------------------------------------------------------------------------------------*/