import ProductSection from '@/sections/products/ProductSection'
import { useThemeContext } from '@/context/ThemeContext'
import { useEffect } from 'react'

const ProductsPage = () => {
  const { theme } = useThemeContext()
  useEffect(() => { document.title = 'Productos' }, [])

  return (
    <ProductSection theme={theme} />
  )
}

export default ProductsPage