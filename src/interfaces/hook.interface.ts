import { ProductFormProps, ProductUpdateFormProps } from "@/schemas/product.schema"
import { UseQueryResult, UseMutateFunction } from "@tanstack/react-query"
import { Product } from "./context.interface"

export interface DeleteProductProps { productId: string; productName: Product['name'] }
export interface UpdateProductProps { productId: string; data: Partial<ProductUpdateFormProps> }

/*useQuery and useMutation*/
export type QueryReact_Product = {//to product
  fetchAllProducts: (businessId: string) => UseQueryResult<Product[], Error>
  fetchProductById: (id: string) => UseQueryResult<Product | undefined, Error>
  fetchProductsByName: (businessId: string, name: string) => UseQueryResult<Product[], Error>
}

export type CustomMutation_Product = {
  createProduct: UseMutateFunction<void, Error, ProductFormProps, unknown>
  updateProduct: UseMutateFunction<void, Error, UpdateProductProps, unknown>
  deleteProduct: UseMutateFunction<void, Error, DeleteProductProps, unknown>
  isLoading: boolean
}