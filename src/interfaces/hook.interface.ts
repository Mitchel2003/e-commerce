import { RegisterUpdateFormProps as BusinessUpdateFormProps, RegisterFormProps as BusinessFormProps } from "@/schemas/auth.schema"
import { ProductFormProps, ProductUpdateFormProps } from "@/schemas/product.schema"
import { UseQueryResult, UseMutateFunction } from "@tanstack/react-query"
import { Business, Product } from "@/interfaces/context.interface"
import { Metadata } from "@/interfaces/db.interface"

/*--------------------------------------------------To product--------------------------------------------------*/
export interface UpdateProductProps { idProduct: string; data: Partial<ProductUpdateFormProps> }
export interface DeleteProductProps { idProduct: string }

/*useQuery and useMutation*/
export type QueryReact_Product = {
  fetchAllProducts: (idBusiness: string) => UseQueryResult<Product[], Error>
  fetchProductById: (idProduct: string) => UseQueryResult<Product | undefined, Error>
  fetchProductsByName: (idBusiness: string, name: string) => UseQueryResult<Product[], Error>
}
export type CustomMutation_Product = {
  createProduct: UseMutateFunction<void, Error, ProductFormProps, unknown>
  updateProduct: UseMutateFunction<void, Error, UpdateProductProps, unknown>
  deleteProduct: UseMutateFunction<void, Error, DeleteProductProps, unknown>
  isLoading: boolean
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------To business--------------------------------------------------*/
export interface DeleteBusinessProps { idBusiness: string }
export interface UpdateBusinessProps { idBusiness: string; data: Partial<BusinessUpdateFormProps> }
export interface DeleteBusinessImageProps { idBusiness: string; nameImage: string }
export interface CreateBusinessImageProps { idBusiness: string; images: BusinessFormProps['references']['photoUrl'] }

/*useQuery and useMutation*/
export type QueryReact_Business = {
  fetchAllBusinesses: () => UseQueryResult<Business[], Error>
  fetchBusinessById: (idBusiness: string) => UseQueryResult<Business | undefined, Error>
  fetchBusinessByQuery: (query: string) => UseQueryResult<Business[], Error>
  fetchAllBusinessImages: (idBusiness: string) => UseQueryResult<Metadata[], Error>
}
export type CustomMutation_Business = {
  updateBusiness: UseMutateFunction<void, Error, UpdateBusinessProps, unknown>
  deleteBusiness: UseMutateFunction<void, Error, DeleteBusinessProps, unknown>
  deleteBusinessImage: UseMutateFunction<void, Error, DeleteBusinessImageProps, unknown>
  createBusinessImage: UseMutateFunction<void, Error, CreateBusinessImageProps, unknown>
  isLoading: boolean
}
/*---------------------------------------------------------------------------------------------------------*/