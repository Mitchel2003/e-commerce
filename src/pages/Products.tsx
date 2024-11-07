import ProductSection from '@/sections/products/ProductSection'
import { useEffect } from 'react'

const ProductsPage = () => {
  useEffect(() => { document.title = 'Productos' }, [])

  return (
    <ProductSection />
  )
}

export default ProductsPage