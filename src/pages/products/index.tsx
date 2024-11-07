import ProductSection from '@/sections/products'
import { useEffect } from 'react'

const ProductsPage = () => {
  useEffect(() => { document.title = 'Productos' }, [])

  return (
    <ProductSection />
  )
}

export default ProductsPage