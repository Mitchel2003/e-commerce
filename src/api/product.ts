import axios from "./axios"

export const getProductRequest = async (id: string) => axios.get(`/product/${id}`)
export const getProductsRequest = async () => axios.get('/products')
export const createProductRequest = async (product: object) => axios.post('/product', product)
export const updateProductRequest = async (id: string, product: object) => axios.put(`/product/${id}`, product)
export const deleteProductRequest = async (id: string) => axios.delete(`/product/${id}`)