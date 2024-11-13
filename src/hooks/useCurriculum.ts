import { CustomMutation_CV, QueryReact_CV } from "@/interfaces/hook.interface";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useCurriculumContext } from "@/context/CurriculumContext";

/*--------------------------------------------------useQuery--------------------------------------------------*/
/**
 * Con este método podemos usar el hook "ReactQuery" para manejar consultas y mutaciones de datos de forma reactiva; usamos axios para operar las solicitudes
 * @returns {QueryReact_CV} proporciona métodos que implementan useQueryResult
 * @example
 *  const { fetchCV } = useQueryReact();
 *  const { data: cv, error, isLoading } = fetchCV(id_cv);
 * @description a través de una clave "queryKey" podemos manejar el estado;
 */
export function useQueryReact(): QueryReact_CV {
  /**
   * Ejecuta una solicitud de un curriculum por su id
   * @param id - Corresponde al "_id" del curriculum en contexto
   */
  const fetchCV = (id: string) => {
    const { getCV } = useCurriculumContext();
    return useQuery({
      queryKey: ['cv', id],
      queryFn: ({ queryKey }) => getCV(queryKey[1]),
      enabled: id !== 'new'
    })
  }
  /** Ejecuta una solicitud que devuelve todos los curriculum del contexto del usuario */
  const fetchCVs = () => {
    const { getCVs } = useCurriculumContext();
    return useQuery({
      queryKey: ['cvs'],
      queryFn: () => getCVs()
    })
  }
  return { fetchCV, fetchCVs }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useMutation--------------------------------------------------*/
/**
 * Nos permite preparar el useMutation de acuerdo a una solicitud específica, usamos axios para llamar a la api
 * @returns {CustomMutation_CV} proporciona métodos que implementan useMutationResult
 * @example
 *  const mutation = useCustomMutation().create();
 *  mutation.mutate(id);
 */
export function useCustomMutation(): CustomMutation_CV {
  // para usar QueryClientProvider
  const queryClient = useQueryClient();
  /**
   * Ejecuta una solicitud condicionalmente basada en el parámetro id
   * @param id - Corresponde al idCurriculum de los parámetros de la url para las acciones de crear o actualizar
   */
  const createOrUpdateCV = (id: string) => {
    const { createCV, updateCV } = useCurriculumContext();
    return useMutation({
      mutationFn: (data: object) => id !== 'new' ? updateCV(id, data) : createCV(data),
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cvs'] }) } // Invalidate and refetch
    })
  }
  /** Ejecuta una solicitud para eliminar un curriculum por su id */
  const deleteCV = () => {
    const { deleteCV } = useCurriculumContext();
    return useMutation({
      mutationFn: (id: string) => deleteCV(id),
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cvs'] }) } // Invalidate and refetch
    })
  }
  return { createOrUpdateCV, deleteCV }
}
/*---------------------------------------------------------------------------------------------------------*/