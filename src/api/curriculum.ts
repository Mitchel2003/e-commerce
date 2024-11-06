import axios from "./axios"

export const getCVRequest = async (id: string) => axios.get(`/cv/${id}`)
export const getCVsRequest = async () => axios.get('/cvs')
export const createCVRequest = async (curriculum: object) => axios.post('/cv', curriculum)
export const updateCVRequest = async (id: string, curriculum: object) => axios.put(`/cv/${id}`, curriculum)
export const deleteCVRequest = async (id: string) => axios.delete(`/cv/${id}`)