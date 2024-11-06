### -----------------------------------------------Readme----------------------------------------------- ###
## Prompt context:==========================================================================================
  ```ts
  //to v0.0.1
  "hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto, dejame explicarte de que se trata; quiero que organices este codigo en componentes separados, (code); organiza todo adecuadamente en mi proyecto actual @src @api @assets @auth @components @context @hooks @interfaces @layouts @lib @pages @schemas @sections @store @utils @App.tsx @main.tsx, por favor organiza mi codigo de manera profesional; dame la estructura de los folders y los componentes para copiar y pegar; estoy usando typescript, shadcn entre otras tecnologias, mira por ejemplo como tengo algunos componentes reutilizables en @fields y @elements; quiero que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, eres capaz de todo lo que te propones, gracias a ti y a mi perseverancia he llegado hasta donde estoy ahora,recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!"
  ```

  ```ts
  //to context
  "hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto, dejame explicarte de que se trata; antes quisiera darte un recuento de como estamos trabajando, mira, en mi proyecto react con typescript tengo un enfoque de arquitectura así (Layouts: contiene la parte mas externa de una page) (Pages: se alojan dentro de layout y es la pagina como tal que el usuario final consume) (Sections: se trata de Secciones que conforman la pagina, en mi caso en especifico, tengo una pagina para crear una hoja de vida de un equipo, entonces mis secciones son las diferentes partes de ese formato) (Components: estos son los componentes que al final se utilizan para construir la seccion, son reutilizables  y escalables lo cual incrementa el profesionalismo de mi app web); esto lo implemento gracias a este video que expica como esta arquitectura es la mejor en cuanto a escalabilidad, codigo dry, implementaciones u cambios de cara al tiempo y profesionalismo, quisiera compartirtelo "............."; a continuacion adjunto las direcciones de las carpetas y archivos para que entiendas el contexto; @client  @src @sections @curriculum @interfaces @components @curriculum @utils @reusables @elements @fields; al final lo que hay es un conjunto de secciones que usan componentes reutilizables para tener codigo DRY y muy escalable, como podras ver se trata de algo muy bien conformado;  (context mistake)   ; por tanto, quiero que te guies de los otros componentes que tengo en mi repretorio de carpetas, mira los tipados en la carpeta interfaces @interfaces y todas las carpetas circundantes @components @curriculum @reusables @elements @fields etc, al final te paso el concepto de lo que quiero implementar, algo reutilizable, escalable, profesional, y eficiente en cuanto codigo, esto para que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, eres capaz de todo lo que te propones, gracias a ti y a mi perseverancia he llegado hasta donde estoy ahora,recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!"
  ```

## Azure Blob Storage - SAS connection:=====================================================================
token SAS === sp=racwdl&st=2024-09-23T21:19:48Z&se=2030-09-24T05:19:48Z&spr=https&sv=2022-11-02&sr=c&sig=uwcjoEGYF8ju5Z%2B3oYCU%2B2k6K9SW46NNpbSob4O70dM%3D
URL SAS === https://gestionsaludcloud.blob.core.windows.net/data?sp=racwdl&st=2024-09-23T21:19:48Z&se=2030-09-24T05:19:48Z&spr=https&sv=2022-11-02&sr=c&sig=uwcjoEGYF8ju5Z%2B3oYCU%2B2k6K9SW46NNpbSob4O70dM%3D

Database: Considere crear índices en la columna "equipo_id" de "Caracteristicas_tecn" para optimizar las consultas.

## Dinamic classes with Taildwind:==========================================================================
  Tailwind CSS funciona de una manera particular cuando se trata de generar estilos en tiempo de compilación.
  *Purga de CSS:*
  Tailwind CSS utiliza un proceso de "purga" para eliminar las clases CSS no utilizadas en producción. Este proceso analiza tu código estático para determinar qué clases se están utilizando. Cuando generamos clases dinámicamente (como bg-${color}-${intensity}), Tailwind no puede detectarlas durante la fase de compilación.
  Solución potencial:
    
  Para resolver este problema, necesitamos asegurarnos de que Tailwind incluya estas clases en el CSS final. Hay varias formas de hacer esto:
  *a.* Safelist: Podemos añadir estas clases a la "safelist" en tu configuración de Tailwind. Esto le dice a Tailwind que incluya estas clases incluso si no las detecta en uso.
  *b.* Uso explícito: Otra opción es usar las clases de manera explícita en algún lugar de tu código, aunque sea en un comentario.

## Implement some day:======================================================================================
  ```ts
    // implement on home page
    import 'react-lazy-load-image-component/src/effects/blur.css';
    import { LazyLoadImage } from 'react-lazy-load-image-component';
  ```

## react-hook-form de manera profesional:===================================================================
  useController: Se usa cuando necesitas un control más granular sobre un campo específico. Es útil cuando estás creando componentes de campo personalizados reutilizables.

  useFormContext: Se utiliza para acceder al contexto del formulario en componentes anidados sin necesidad de pasar props manualmente.

  *1.* Análisis de ImageField.tsx:
    El ImageField utiliza useController porque es un componente de campo personalizado que maneja una lógica compleja (carga de imagen, vista previa, etc.). Esto permite un control preciso sobre el campo y su comportamiento.
  ```ts
    //Este enfoque es ideal para campos complejos que requieren una lógica personalizada.
    const { field } = useController({ name, control, defaultValue: null })
  ```
  *2.* Análisis de AccessoriesSection.tsx y IterableCardField.tsx:
    En AccessoriesSection, estás utilizando FormProvider y useForm:
  ```ts
    //Esto permite que IterableCardField acceda al contexto del formulario usando useFormContext:
    const methods = useForm<AccessoriesProps>();
    return (
      <FormProvider {...methods}>
        <IterableCardField {...props} />
      </FormProvider>
    )

    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    //Este enfoque es excelente para componentes que manejan múltiples campos relacionados, como en el caso de los accesorios iterables.
  ```
  *4.* Consideraciones de rendimiento:
    useFormContext es más eficiente cuando tienes múltiples campos anidados, ya que evita el prop drilling.
    useController es más eficiente para campos individuales complejos, ya que permite un control más preciso sobre las re-renderizaciones.
  *5.* Tipado con AccessoriesProps:
    El uso de useForm<AccessoriesProps>() es una excelente práctica. Asegura que el formulario esté correctamente tipado, lo que mejora la seguridad del tipo y facilita el desarrollo.
  *6.* Recomendaciones profesionales:
    *a. Consistencia en el enfoque:*
      Usa useController para campos complejos individuales (como ImageField).
      Usa useFormContext con FormProvider para secciones con múltiples campos relacionados.
    *b. Optimización de rendimiento:*
      Considera usar React.memo en componentes de campo para evitar re-renderizaciones innecesarias.
      Utiliza useCallback para funciones que se pasan como props a componentes hijos.
    *c. Mejora en IterableCardField:*
      Podrías considerar usar useController dentro de IterableCardField para cada campo individual, lo que podría mejorar aún más el rendimiento:

## Page reactive with React Query:==========================================================================
*¿Qué es React Query?*
React Query es una biblioteca que facilita el manejo de solicitudes de datos y caching en aplicaciones React. Su mayor fortaleza es cómo maneja el "caching" de datos y las solicitudes repetidas, lo que evita hacer llamadas redundantes al backend. También optimiza automáticamente el rendimiento al invalidar datos solo cuando es necesario.

*Ventajas de React Query*
- **Manejo de caché eficiente**: Almacena automáticamente las respuestas y las reutiliza cuando es posible.
- **Actualizaciones automáticas**: Puedes mantener actualizada la UI automáticamente cuando los datos cambian en el servidor.
- **Minimización del uso de `useEffect`**: Reduce la necesidad de manejar manualmente los efectos secundarios en componentes.
- **Sincronización en segundo plano**: Refresca los datos en segundo plano sin interrumpir la UI.
- **Reintentos automáticos**: En caso de error, puede reintentar la solicitud sin necesidad de escribir lógica adicional.

*Request con React Query*
Aquí tienes un ejemplo que puedes ajustar a tu implementación de `getTasks`:

```tsx
import { useQuery } from 'react-query';
import TaskCard from './TaskCard';
import { getTasks } from '../api/tasks'; // asumiendo que tienes un servicio de API

function Tasks() {
  const { data: tasks, error, isLoading, isError } = useQuery('tasks', getTasks);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks: {error.message}</div>;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
```

*Desglose de la sintaxis*
1. **`useQuery`**: Esta función toma dos parámetros clave: 
   - **Una clave única** (`'tasks'` en este caso), que identifica el "query" (consulta).
   - **Una función de solicitud** (`getTasks`), que define cómo obtener los datos desde tu backend.
2. **Estados del "query"**:
   - **`isLoading`**: Indica si la consulta aún está en progreso.
   - **`isError`**: Indica si hubo un error en la solicitud.
   - **`data`**: Contiene los datos de la consulta cuando esta se completa correctamente.

Este `getTasks` hace una solicitud HTTP utilizando Axios para obtener los datos. React Query almacenará esos datos en caché y los reutilizará si es necesario.

*Revalidación automática y "stale" data*
React Query maneja los datos en diferentes fases:
- **Fresh (frescos)**: Datos recién cargados.
- **Stale (caducos)**: Datos que pueden estar desactualizados, pero siguen en caché.
- **Refetching (actualizando)**: Los datos son nuevamente solicitados.
Por ejemplo, cuando vuelves a la página de tareas, si los datos aún son "fresh", no se vuelve a hacer una solicitud HTTP, pero si son "stale", React Query hará una nueva solicitud en segundo plano.

*Configuraciones avanzadas con `useQuery`*
Puedes personalizar la forma en que las solicitudes se manejan. Algunas opciones avanzadas:
```tsx
useQuery('tasks', getTasks, {
  staleTime: 5000,  // Tiempo antes de que los datos se consideren "caducos"
  cacheTime: 10000,  // Tiempo que los datos se guardan en caché
  refetchOnWindowFocus: true,  // Refresca los datos cuando la ventana gana el foco
  retry: 2,  // Reintenta la solicitud dos veces si falla
});
```

## Mutation (Query React):==================================================================================
Ahora que tienes la sobrecarga de funciones, puedes hacer que tu función `mutation` acepte esta mutación flexible. Además, desestructurar los parámetros y organizar el código siguiendo las mejores prácticas aumentará la legibilidad y profesionalidad.

```typescript
export type Mutation = {
  (task: object): Promise<Task>;
  (id: string, task: object): Promise<Task>;
};

const useCustomMutation = ( method: Mutation, queryKey: string ) => {
  const queryClient = useQueryClient();
  return (data: object, id?: string) => {
    const build = useMutation({
      mutationFn: () => id ? method(id, data) : method(data),
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: [queryKey] }) }
    });
    build.mutate(data);
  };
};

const mutation = useCustomMutation(createTask, 'tasks');
mutation({ title: 'Nueva Tarea' });

const mutation = useCustomMutation(updateTask, 'tasks');
mutation({ title: 'Tarea Actualizada' }, '123');
```

## Zustand -> Handle local state:===========================================================================
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

// Definición de tipos
interface Repo { id: number; name: string }
interface FavoriteReposState {
  favoriteRepos: Repo[];
  addFavoriteRepo: (repo: Repo) => void;
  removeFavoriteRepo: (repoId: number) => void;
  clearFavoriteRepos: () => void;
}

// Creación del store
export const useFavoriteReposStore = create<FavoriteReposState>()(
  devtools(
    persist(
      immer((set) => ({
        favoriteRepos: [],
        addFavoriteRepo: (repo) =>
          set((state) => {
            if (!state.favoriteRepos.some((r) => r.id === repo.id)) {
              state.favoriteRepos.push(repo);
            }
          }),
        removeFavoriteRepo: (repoId) =>
          set((state) => {
            state.favoriteRepos = state.favoriteRepos.filter((r) => r.id !== repoId);
          }),
        clearFavoriteRepos: () =>
          set((state) => {
            state.favoriteRepos = [];
          }),
      })),
      {
        name: 'favorite-repos-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

// Selector de ejemplo
  export const selectFavoriteReposCount = (state: FavoriteReposState) => state.favoriteRepos.length;

  const favoriteRepos = useFavoriteReposStore((state) => state.favoriteRepos);
  const addFavoriteRepo = useFavoriteReposStore((state) => state.addFavoriteRepo);
  const favoriteCount = useFavoriteReposStore(selectFavoriteReposCount);
```
1. **Uso de middlewares**:
   - `immer`: Permite escribir código "mutable" que se convierte en actualizaciones inmutables, lo que hace que el código sea más legible y menos propenso a errores.
   - `devtools`: Habilita la integración con Redux DevTools para una mejor depuración.
   - `persist`: Permite persistir el estado en el almacenamiento local del navegador.
2. **Acciones más robustas**: Hemos definido acciones para añadir, eliminar y limpiar repositorios favoritos, con lógica para evitar duplicados.
3. **Selector**: Hemos agregado un selector de ejemplo que demuestra cómo se pueden derivar datos del estado.
4. **Uso de immer**: Permite "mutar" el estado directamente dentro de las acciones, lo que hace que el código sea más intuitivo y fácil de leer.
5. **Persistencia**: El estado se guarda automáticamente en el almacenamiento local, lo que mejora la experiencia del usuario entre sesiones.

## Desestructuration or Especific selection (example with zustand):=========================================
   ```typescript
    // Seleccion especifica
    const addTaskStore = useFavoriteTask(state => state.addFavoriteTask);    

    //O desestructuracion predeterminada
    const { addFavoriteTask: addTaskStore, removeFavoriteTask: removeTaskStore } = useFavoriteTask();

    import { create } from "zustand";
    export const useFavoriteTask = create<FavoriteTaskState>((set) => ({
      favoriteTaskIds: [],
      addFavoriteTask: (id: string) => set((state) => ({
        favoriteTaskIds: [...state.favoriteTaskIds, id]
      })),
      removeFavoriteTask: (id: string) => set((state) => ({
        favoriteTaskIds: state.favoriteTaskIds.filter((e) => e !== id)
      }))
    }));
   ```
Análisis:
1. Rendimiento: La primera forma es ligeramente más eficiente en términos de rendimiento. Zustand solo volverá a renderizar el componente si las propiedades específicas que seleccionaste cambian. Con la desestructuración completa, el componente podría re-renderizarse si cualquier parte del estado cambia, aunque no uses todas las propiedades.
2. Tipado: Ambas formas mantienen el tipado correcto en TypeScript, así que no hay preocupaciones en ese aspecto.
3. Claridad: La primera forma es más explícita sobre qué partes del estado se están utilizando, lo que puede hacer que el código sea más fácil de entender y mantener.
4. Errores en ejecución: No deberías experimentar errores en ejecución con ninguna de las dos formas, siempre y cuando uses las funciones correctamente (pasando el ID como lo estás haciendo).

## useNavigate() or <Navigate>:=============================================================================
### Navigate (Componente):
Navigate es un componente de React Router que redirige automáticamente a una ruta específica cuando se renderiza.
Se usa principalmente cuando necesitas redirigir de forma declarativa, es decir, basado en condiciones dentro del JSX.
Es ideal cuando la redirección depende del resultado de una condición lógica directamente en la estructura de los componentes.
```typescript
if (!isAuth) return <Navigate to="/login" replace />;//El componente Navigate tiene la ventaja de ser conciso y declarativo, ideal para redirecciones inmediatas dentro de la estructura del JSX.
```
### useNavigate (Hook):
useNavigate es un hook de React Router que te permite realizar redirecciones de manera programática desde funciones y efectos (useEffect), dándote más control sobre cuándo y cómo ocurre la redirección.
Se usa principalmente cuando necesitas realizar una navegación como respuesta a eventos, funciones asíncronas, o después de ejecutar lógica adicional.
```typescript
useEffect(() => { if (isAuth) navigate('/tasks') }, [isAuth]);//useNavigate es muy útil en flujos complejos donde la redirección depende de múltiples factores que no puedes determinar solo con JSX.
```
### ---------------------------------------------------------------------------------------------------- ###