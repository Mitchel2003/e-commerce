import { RegisterUpdateFormProps as BusinessUpdateFormProps, RegisterFormProps as BusinessFormProps } from "@/schemas/auth.schema"
import { ProductFormProps, ProductUpdateFormProps } from "@/schemas/product.schema"
import { Business, BusinessStats, Product } from "@/interfaces/context.interface"
import { UseQueryResult, UseMutateAsyncFunction } from "@tanstack/react-query"
import { Metadata, QueryProps } from "@/interfaces/db.interface"

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
  createProduct: UseMutateAsyncFunction<void, Error, ProductFormProps, unknown>
  updateProduct: UseMutateAsyncFunction<void, Error, UpdateProductProps, unknown>
  deleteProduct: UseMutateAsyncFunction<void, Error, DeleteProductProps, unknown>
  updateLikesProduct: UseMutateAsyncFunction<boolean, Error, UpdateProductProps['idProduct'], unknown>
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
  fetchBusinessStatsById: (idBusiness: string) => UseQueryResult<BusinessStats | undefined, Error>
  fetchBusinessByQuery: (options: QueryProps) => UseQueryResult<Business[], Error>
  fetchAllBusinessImages: (idBusiness: string) => UseQueryResult<Metadata[], Error>
}
export type CustomMutation_Business = {
  updateBusiness: UseMutateAsyncFunction<void, Error, UpdateBusinessProps, unknown>
  deleteBusiness: UseMutateAsyncFunction<void, Error, DeleteBusinessProps, unknown>
  deleteBusinessImage: UseMutateAsyncFunction<void, Error, DeleteBusinessImageProps, unknown>
  createBusinessImage: UseMutateAsyncFunction<void, Error, CreateBusinessImageProps, unknown>
  recordVisit: UseMutateAsyncFunction<void, Error, { idBusiness: string }, unknown>
  isLoading: boolean
}
/*---------------------------------------------------------------------------------------------------------*/