// import { TaskFunction } from "../interfaces/props.interface";
// import { useTaskContext } from "../context/TaskContext";
// import { useFavoriteTask } from "../store/favoriteTask";
// import TaskCard from "../components/tasks/TaskCard";
// import { useQueryReact } from "../hooks/useTasks";

// function Tasks() {
//   const { data: tasks = [], error, isLoading } = useQueryReact().fetchTasks();
//   const favoriteTasks = useFavoriteTask(state => state.favoriteTaskIds);
//   const { errors } = useTaskContext();

//   if (error) return <h1> {error.message} </h1>
//   if (isLoading) return <h1> Cargando... </h1>

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mb-4"> {showErrors(errors)} </div>
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">{showTaskList(tasks, favoriteTasks)}</div>
//     </div>
//   )
// }

// export default Tasks
// /*---------------------------------------------------------------------------------------------------------*/

// /*--------------------------------------------------tools--------------------------------------------------*/
// const showErrors = (errors: string[]) => {
//   return errors.map((error, index) => (
//     <div key={index} className="bg-red-500 text-white p-2 rounded-md mb-2">
//       {error}
//     </div>
//   ))
// }

// const showTaskList: TaskFunction = (tasks, favorite) => {
//   return tasks.length > 0 ? (
//     tasks.map((task) => (
//       <TaskCard
//         key={task._id}
//         task={task}
//         isFavorite={favorite.includes(task._id)}
//       />
//     ))
//   ) : (
//     <div className="col-span-full flex justify-center items-center h-40">
//       <h2 className="text-xl font-semibold text-gray-600">No hay tareas registradas</h2>
//     </div>
//   )
// }