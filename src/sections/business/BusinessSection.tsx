import { ProductCarousel } from '@/sections/business/ProductCarouselSection';
import { BusinessDescription } from '@/sections/business/DescriptionSection';
import { SocialMediaSection } from '@/sections/business/SocialMediaSection';
import { BusinessHeader } from '@/sections/business/HeaderSection';
import { ThemeContextProps } from '@/interfaces/context.interface';
import { useQueryBusiness } from '@/hooks/useBusinessQuery';
import { useQueryProduct } from '@/hooks/useProductQuery';
import { useParams } from 'react-router-dom';

export const BusinessSection = ({ theme }: ThemeContextProps) => {
  const { id = '' } = useParams();

  // Fetch business data
  const { fetchBusinessById } = useQueryBusiness();
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(id);

  // Fetch products data
  const { fetchProducts } = useQueryProduct();
  const { data: products, isLoading: isLoadingProducts } = fetchProducts(id);

  if (isLoadingBusiness || isLoadingProducts) return <div>Cargando...</div>
  if (!business) return <div>Negocio no encontrado</div>

  return (
    <div className="container p-0 mx-auto">
      <BusinessHeader
        name={business.name}
        imageUrl={business.photoUrl[0]}
        theme={theme}
      />
      <BusinessDescription
        description={business.description}
        theme={theme}
      />
      <ProductCarousel
        products={products}
        theme={theme}
      />
      {business.socialNetworks && (
        <SocialMediaSection
          socialMedia={business.socialNetworks}
          theme={theme}
        />
      )}
    </div>
  )
}