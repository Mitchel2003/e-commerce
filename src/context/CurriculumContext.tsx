import { createCVRequest, getCVRequest, getCVsRequest, updateCVRequest, deleteCVRequest } from "@/api/curriculum";
import { Curriculum as TypeCurriculum, CurriculumContext } from "@/interfaces/context.interface";
import { isApiResponse, isAxiosResponse } from "@/interfaces/response.interface";
import { Props } from "@/interfaces/props.interface";

import { useState, useContext, createContext, useEffect } from "react";

const Curriculum = createContext<CurriculumContext>(undefined)

/**
 * Hook personalizado para acceder al contexto de curriculums.
 * @throws {Error} Si se intenta usar fuera del CurriculumProvider.
 */
export const useCurriculumContext = () => {
  const context = useContext(Curriculum)
  if (!context) throw new Error('Error al intentar usar curriculumContext')
  return context
}

/**
 * Proveedor del contexto de curriculums.
 * Maneja el estado de los curriculums y proporciona funciones para interactuar con ellos.
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que envuelve a los hijos con el contexto de curriculums.
 */
export const CurriculumProvider = ({ children }: Props): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => timeAlert(), [errors])

  /** Configura un temporizador para limpiar los errores después de 5 segundos */
  const timeAlert = () => {
    if (errors.length === 0) return;
    const timer = setTimeout(() => setErrors([]), 5000);
    return () => clearTimeout(timer);
  }

  /**
   * Obtiene un curriculum específico por su ID.
   * @param {string} id - El ID del curriculum a obtener.
   * @returns {Promise<TypeCurriculum>} Los datos del curriculum o undefined en caso de error.
   */
  const getCV = async (id: string): Promise<TypeCurriculum> => {
    try { const res = await getCVRequest(id); return res.data }
    catch (e: unknown) { setCurriculumStatus(e); return undefined }
  }

  /**
   * Obtiene todos los curriculums del usuario en contexto
   * @returns {Promise<TypeCurriculum[]>} Un array con los datos de todos los curriculums.
   */
  const getCVs = async (): Promise<TypeCurriculum[]> => {
    try { const res = await getCVsRequest(); return res.data }
    catch (e: unknown) { setCurriculumStatus(e); return [] }
  }

  /**
   * Crea un nuevo curriculum.
   * @param {object} curriculum - Los datos del curriculum a crear.
   * @returns {Promise<TypeCurriculum>} Los datos del curriculum creado o undefined en caso de error.
   */
  const createCV = async (curriculum: object): Promise<TypeCurriculum> => {
    try { const res = await createCVRequest(curriculum); return res.data }
    catch (e: unknown) { setCurriculumStatus(e); return undefined }
  }

  /**
   * Actualiza un curriculum existente por su ID.
   * @param {string} id - El ID del curriculum a actualizar.
   * @param {object} curriculum - Los nuevos datos del curriculum.
   * @returns {Promise<TypeCurriculum>} Los datos del curriculum actualizado o undefined en caso de error.
   */
  const updateCV = async (id: string, curriculum: object): Promise<TypeCurriculum> => {
    try { const res = await updateCVRequest(id, curriculum); return res.data }
    catch (e: unknown) { setCurriculumStatus(e); return undefined }
  }

  /**
   * Elimina un curriculum por su ID.
   * @param {string} id - El ID del curriculum a eliminar.
   * @returns {Promise<TypeCurriculum>} Los datos del curriculum eliminado o undefined en caso de error.
   */
  const deleteCV = async (id: string): Promise<TypeCurriculum> => {
    try { const res = await deleteCVRequest(id); return res.data }
    catch (e: unknown) { setCurriculumStatus(e); return undefined }
  }

  /**
   * Maneja los errores de las operaciones de curriculums.
   * @param {unknown} e - El error capturado.
   */
  const setCurriculumStatus = (e: unknown) => {
    if (isAxiosResponse(e)) setErrors([e.response.data])
    if (isApiResponse(e)) setErrors([e.data])
  }

  return (
    <Curriculum.Provider value={{ errors, getCV, getCVs, createCV, updateCV, deleteCV }}>
      {children}
    </Curriculum.Provider>
  )
}