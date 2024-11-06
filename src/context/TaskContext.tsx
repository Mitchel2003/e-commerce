import { createTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest, deleteTaskRequest } from "@/api/task";
import { isApiResponse, isAxiosResponse } from "@/interfaces/response.interface";
import { Task as TypeTask, TaskContext } from "@/interfaces/context.interface";
import { Props } from "@/interfaces/props.interface";

import { useState, useContext, createContext, useEffect } from "react";

const Task = createContext<TaskContext>(undefined)

/**
 * Hook personalizado para acceder al contexto de tareas.
 * @throws {Error} Si se intenta usar fuera del TaskProvider.
 */
export const useTaskContext = () => {
  const context = useContext(Task)
  if (!context) throw new Error('Error al intentar usar taskContext')
  return context
}

/**
 * Proveedor del contexto de tareas.
 * Maneja el estado de las tareas y proporciona funciones para interactuar con ellas.
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que envuelve a los hijos con el contexto de tareas.
 */
export const TaskProvider = ({ children }: Props): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => timeAlert(), [errors])

  /** Configura un temporizador para limpiar los errores después de 5 segundos */
  const timeAlert = () => {
    if (errors.length === 0) return;
    const timer = setTimeout(() => setErrors([]), 5000);
    return () => clearTimeout(timer);
  }

  /**
   * Obtiene una tarea específica por su ID.
   * @param {string} id - El ID de la tarea a obtener.
   * @returns {Promise<TypeTask>} Los datos de la tarea o undefined en caso de error.
   */
  const getTask = async (id: string): Promise<TypeTask> => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    }
    catch (e: unknown) {
      setTaskStatus(e)
      return undefined
    }
  }

  /**
   * Obtiene todas las tareas del usuario en contexto
   * @returns {Promise<TypeTask[]>} Un array con los datos de todas las tareas.
   */
  const getTasks = async (): Promise<TypeTask[]> => {
    try {
      const res = await getTasksRequest()
      return res.data
    }
    catch (e: unknown) {
      setTaskStatus(e)
      return []
    }
  }

  /**
   * Crea una nueva tarea.
   * @param {object} task - Los datos de la tarea a crear.
   * @returns {Promise<TypeTask>} Los datos de la tarea creada o undefined en caso de error.
   */
  const createTask = async (task: object): Promise<TypeTask> => {
    try {
      const res = await createTaskRequest(task)
      return res.data
    }
    catch (e: unknown) {
      setTaskStatus(e)
      return undefined
    }
  }

  /**
   * Actualiza una tarea existente por su ID.
   * @param {string} id - El ID de la tarea a actualizar.
   * @param {object} task - Los nuevos datos de la tarea.
   * @returns {Promise<TypeTask>} Los datos de la tarea actualizada o undefined en caso de error.
   */
  const updateTask = async (id: string, task: object): Promise<TypeTask> => {
    try {
      const res = await updateTaskRequest(id, task)
      return res.data
    }
    catch (e: unknown) {
      setTaskStatus(e)
      return undefined
    }
  }

  /**
   * Elimina una tarea por su ID.
   * @param {string} id - El ID de la tarea a eliminar.
   * @returns {Promise<TypeTask>} Los datos de la tarea eliminada o undefined en caso de error.
   */
  const deleteTask = async (id: string): Promise<TypeTask> => {
    try {
      const res = await deleteTaskRequest(id)
      return res.data
    }
    catch (e: unknown) {
      setTaskStatus(e)
      return undefined
    }
  }

  /**
   * Maneja los errores de las operaciones de tareas.
   * @param {unknown} e - El error capturado.
   */
  const setTaskStatus = (e: unknown) => {
    if (isAxiosResponse(e)) setErrors([e.response.data])
    if (isApiResponse(e)) setErrors([e.data])
  }

  return (
    <Task.Provider value={{ errors, getTask, getTasks, createTask, updateTask, deleteTask }}>
      {children}
    </Task.Provider>
  )
}