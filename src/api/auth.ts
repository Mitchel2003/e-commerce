import axios from "./axios";

export const loginRequest = async (user: object) => axios.post('/auth/login', user);
export const registerRequest = async (user: object) => axios.post('/auth/register', user);
export const verifyAuthRequest = async () => axios.get('/auth/verify-auth');