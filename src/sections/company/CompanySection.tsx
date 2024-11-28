import { ProductCarousel } from '@/sections/company/ProductCarouselSection';
import { SocialMediaSection } from '@/sections/company/SocialMediaSection';
import { CompanyDescription } from '@/sections/company/DescriptionSection';
import { CompanyHeader } from '@/sections/company/HeaderSection';
import { useQueryBusiness } from '@/hooks/useBusinessQuery';
import { useParams } from 'react-router-dom';

export const CompanyPage = () => {
  const { id = '' } = useParams();
  const { fetchBusinessById } = useQueryBusiness()
  const { data: company, isLoading } = fetchBusinessById(id)
  const { fetchProducts } = useQueryProduct()
  const { data: products, isLoading: isLoadingProducts } = fetchProducts()

  if (isLoading) return <div>Cargando...</div>
  if (isLoadingProducts) return <div>Cargando productos...</div>

  if (!company) return <div>Empresa no encontrada</div>

  //with a context of products we can get the products of the company
  //maybe with 2 contexts, one for the business and one for the products
  //so we can get the products of the company and show them in the carousel, and equal to the business
  return (
    <div>
      <CompanyHeader name={company.name} imageUrl={company.photoUrl[0]} />
      <CompanyDescription description={company.description} />
      <ProductCarousel products={products} />
      <SocialMediaSection socialMedia={company.socialNetworks} />
    </div>
  )
}