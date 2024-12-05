import { ProductFormProps, ProductUpdateFormProps } from "@/schemas/product.schema"
import { UseQueryResult, UseMutateFunction } from "@tanstack/react-query"
import { Product } from "./context.interface"

export interface UpdateProductProps { idProduct: string; data: Partial<ProductUpdateFormProps> }
export interface DeleteProductProps { idProduct: string }

/*useQuery and useMutation*/
export type QueryReact_Product = {//to product
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