import axios from "./axios"

export const getCVRequest = async (id: string) => axios.get(`/form/cv/${id}`)
export const getCVsRequest = async () => axios.get('/form/cvs')
export const createCVRequest = async (curriculum: object) => axios.post('/form/cv', curriculum)
export const updateCVRequest = async (id: string, curriculum: object) => axios.put(`/form/cv/${id}`, curriculum)
export const deleteCVRequest = async (id: string) => axios.delete(`/form/cv/${id}`)