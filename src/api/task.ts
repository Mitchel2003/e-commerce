import axios from "./axios";

export const getTaskRequest = async (id: string) => axios.get(`/task/${id}`);
export const getTasksRequest = async () => axios.get('/tasks');
export const createTaskRequest = async (task: object) => axios.post('/task', task);
export const updateTaskRequest = async (id: string, task: object) => axios.put(`/task/${id}`, task);
export const deleteTaskRequest = async (id: string) => axios.delete(`/task/${id}`);