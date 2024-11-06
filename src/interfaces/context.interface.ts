/*--------------------------------------------------ThemeContext--------------------------------------------------*/
export type Theme = 'light' | 'dark'

export type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
} | undefined

export type ThemeContextProps = { theme: Theme }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------AuthContext--------------------------------------------------*/
export type User = { _id: string, username: string, email: string } | undefined

export type AuthContext = {
  user: User;
  isAuth: boolean;
  loading: boolean;
  errors: string[];
  signin: (user: object) => Promise<void>;
  signup: (user: object) => Promise<void>;
  logout: () => void;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------CurriculumContext--------------------------------------------------*/
export type Curriculum = {
  _id: string;
} | undefined

export type TypeCurriculum = {
  (id: string): Promise<Curriculum>
}
export type TypeCurriculums = {
  (): Promise<Curriculum[]>
}
export type CreateCurriculum = {
  (Curriculum: object): Promise<Curriculum>
}
export type UpdateCurriculum = {
  (id: string, Curriculum: object): Promise<Curriculum>
}
export type DeleteCurriculum = {
  (id: string): Promise<Curriculum>
}

export type CurriculumContext = {
  errors: string[];
  getCV: TypeCurriculum;
  getCVs: TypeCurriculums;
  createCV: CreateCurriculum;
  updateCV: UpdateCurriculum;
  deleteCV: DeleteCurriculum;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------TaskContext--------------------------------------------------*/
export type Task = {
  _id: string;
  title: string;
  description: string;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
} | undefined

export type TypeTask = {
  (id: string): Promise<Task>
}
export type TypeTasks = {
  (): Promise<Task[]>
}
export type CreateTask = {
  (task: object): Promise<Task>
}
export type UpdateTask = {
  (id: string, task: object): Promise<Task>
}
export type DeleteTask = {
  (id: string): Promise<Task>
}

export type TaskContext = {
  errors: string[];
  getTask: TypeTask;
  getTasks: TypeTasks;
  createTask: CreateTask;
  updateTask: UpdateTask;
  deleteTask: DeleteTask;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/