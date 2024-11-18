import axios from "./axios";

export const loginRequest = async (user: object) => axios.post('/auth/login', user);
export const registerRequest = async (user: object) => axios.post('/auth/register', user);
export const verifyAuthRequest = async () => axios.get('/auth/verify-auth');

//auth firebase (technoPark)
export const loginFirebaseRequest = async (user: object) => axios.post('/technopark/auth/login-firebase', user);
export const registerFirebaseRequest = async (user: object) => axios.post('/technopark/auth/register-firebase', user);
export const verifyAuthFirebaseRequest = async () => axios.get('/technopark/auth/verify-auth-firebase');