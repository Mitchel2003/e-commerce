import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useQueryReact, useCustomMutation } from "@/hooks/useTasks";
import { useTaskContext } from "@/context/TaskContext";
import { FieldValues } from 'react-hook-form';
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs";
dayjs.extend(utc)

function TaskForm() {
  const { register, handleSubmit, setValue, formState: { errors: errsForm } } = useForm();
  const { errors } = useTaskContext();
  const { id = 'new' } = useParams();
  const navigate = useNavigate();

  const mutation = useCustomMutation().createOrUpdateTask(id);
  const { data: task, error, isLoading } = useQueryReact().fetchTask(id);

  useEffect(() => { if (mutation.isSuccess) navigate('/tasks') }, [mutation.isSuccess])
  useEffect(() => { setInputValues() }, [task]);

  /** Función para manejar onClick */
  const onSubmit = handleSubmit(async (values) => mutation.mutate(schemaTask(values)));
  const setInputValues = () => {
    if (!task || id === 'new') return;
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'));
  }
  if (error) return (<div className="bg-red-600"> <h1 className="text-white"> {error.message} </h1> </div>)
  if (isLoading) return (<h1 className="font-bold text-2xl"> Cargando... </h1>)

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

      {errors.map((e, i) => (<div key={i} className="bg-red-500 text-white"> {e} </div>))}

      <form onSubmit={onSubmit}>

        <label> Título </label>
        <input
          type="text"
          placeholder="Título"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          {...register('title', { required: true })}
        />

        {errsForm.title && (<p className="text-red-500">El título es requerido</p>)}

        <label> Descripción </label>
        <textarea
          placeholder="Descripción"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          {...register('description', { required: true })}
        />

        {errsForm.description && (<p className="text-red-500">La descripción es requerida</p>)}

        <label> Fecha </label>
        <input
          type="date"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          {...register('date')}
        />

        <button type="submit" className="bg-indigo-500 px-3 py-2 mt-3 rounded-md"> Guardar </button>

      </form>
    </div>
  )
}

export default TaskForm

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Nos ayuda a construir un formato de tarea y enviar solicitudes como crear o actualizar
 * @param values es un objeto de datos que representa los campos en el contexto del formulario
 * @returns {object} un objeto que significa el esquema de tarea a utilizar en la solicitud
 */
function schemaTask(values: FieldValues): object { return { ...values, date: dateFormat(values.date) } }
/**
 * Nos permite obtener la fecha formateada desde el lado del cliente (<input type="date"/>)
 * @param date Corresponde a la fecha en formato de cadena (DD/MM/YYYY)
 * @returns {Date} es una fecha; si la entrada no tiene algo, este método devuelve la fecha actual 
 */
function dateFormat(date?: string): Date { return new Date(dayjs.utc(date || undefined).format()) }