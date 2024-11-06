// import { TaskCardProps } from "@/interfaces/props.interface";
// import { useFavoriteTask } from "@/store/favoriteTask";
// import { useCustomMutation } from "@/hooks/useTasks";
// import { Link } from "react-router-dom";
// import utc from "dayjs/plugin/utc";
// import dayjs from "dayjs";
// dayjs.extend(utc)

// import { Button } from "#/ui/button";

// function TaskCard({ task, isFavorite }: TaskCardProps) {
//   const removeFavorite = useFavoriteTask(state => state.removeFavoriteTask)
//   const addFavorite = useFavoriteTask(state => state.addFavoriteTask)
//   const mutation = useCustomMutation().deleteTask();
//   /**
//    * Handler that execute a custom mutation (Query React); this way we can fetch and put data on cache to evade refetchs
//    * @returns a method to remove and agree task favorite depending from Props obtained
//    */
//   const handleDelete = () => mutation.mutate(task._id)
//   /**
//    * Helps us to toggle the state favorite task using local store (Zustand)
//    * @returns {void} a method to remove and agree task favorite depending from Props obtained
//    */
//   const handleFavorite = (): void => isFavorite ? removeFavorite(task._id) : addFavorite(task._id)

//   return (
//     <div className="bg-zinc-800 max-w-md w-full p-6 rounded-md">
//       <h1 className="text-2xl font-bold"> {task.title} </h1>
//       <p className="text-slate-300"> Description: {task.description} </p>
//       <p className="text-slate-300"> Date: {dayjs(task?.date ?? '').utc().format("DD/MM/YYYY")} </p>

//       <div className="flex items-center mt-2 gap-x-2">

//         <Button
//           onClick={handleFavorite}
//           className={`
//             text-white px-4 py-2 rounded-md

//             ${isFavorite
//               ? 'bg-fuchsia-600 hover:bg-fuchsia-700'
//               : 'bg-gray-600 hover:bg-gray-700'
//             }
//           `}
//         >
//           &#11088;
//         </Button>

//         <Button
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           <Link to={`/task/${task._id}`}> Editar </Link>
//         </Button>

//         <Button
//           onClick={handleDelete}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
//         >
//           Eliminar
//         </Button>

//       </div>
//     </div>
//   )
// }

// export default TaskCard