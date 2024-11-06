import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { CustomMutation_Task, QueryReact_Task } from "../interfaces/props.interface";
import { useTaskContext } from "../context/TaskContext";

/*--------------------------------------------------useQuery--------------------------------------------------*/
/**
 * Con este método podemos usar el hook "ReactQuery" para manejar consultas y mutaciones de datos de forma reactiva; usamos axios para operar las solicitudes
 * @returns {QueryReact_Task} proporciona métodos que implementan useQueryResult
 * @example
 *  const { fetchTask } = useQueryReact();
 *  const { data: task, error, isLoading } = fetchTask(id_task);
 * @description a través de una clave "queryKey" podemos manejar el estado;
 */
export function useQueryReact(): QueryReact_Task {
  /**
   * Ejecuta una solicitud de una tarea por su id
   * @param id - Corresponde al "_id" de la tarea en el contexto
   */
  const fetchTask = (id: string) => {
    const { getTask } = useTaskContext();
    return useQuery({
      queryKey: ['task', id],
      queryFn: ({ queryKey }) => getTask(queryKey[1]),
      enabled: id !== 'new'
    });
  }
  /** Ejecuta una solicitud que devuelve todas las tareas del contexto del usuario */
  const fetchTasks = () => {
    const { getTasks } = useTaskContext();
    return useQuery({
      queryKey: ['tasks'],
      queryFn: () => getTasks()
    });
  }
  return { fetchTask, fetchTasks }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useMutation--------------------------------------------------*/
/**
 * Nos permite preparar el useMutation de acuerdo a una solicitud específica, usamos axios para llamar a la api
 * @returns {CustomMutation} proporciona métodos que implementan useMutationResult
 * @example
 *  const mutation = useCustomMutation().create();
 *  mutation.mutate(id);
 */
export function useCustomMutation(): CustomMutation_Task {
  // para usar QueryClientProvider
  const queryClient = useQueryClient();
  /**
   * Ejecuta una solicitud condicionalmente basada en el parámetro id
   * @param id - Corresponde al idTask de los parámetros de la url para las acciones de crear o actualizar
   */
  const createOrUpdateTask = (id: string) => {
    const { createTask, updateTask } = useTaskContext();
    return useMutation({
      mutationFn: (data: object) => id !== 'new' ? updateTask(id, data) : createTask(data),
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tasks'] }) } // Invalidate and refetch
    });
  }
  /** Ejecuta una solicitud para eliminar una tarea por su id */
  const deleteTask = () => {
    const { deleteTask } = useTaskContext();
    return useMutation({
      mutationFn: (id: string) => deleteTask(id),
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tasks'] }) } // Invalidate and refetch
    });
  }
  return { createOrUpdateTask, deleteTask }
}
/*---------------------------------------------------------------------------------------------------------*/