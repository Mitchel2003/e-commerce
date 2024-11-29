import { ProductCarousel } from '@/sections/business/ProductCarouselSection';
import { SocialMediaSection } from '@/sections/business/SocialMediaSection';
import { BusinessDescription } from '@/sections/business/DescriptionSection';
import { BusinessHeader } from '@/sections/business/HeaderSection';
import { useQueryProduct } from '@/hooks/useProductQuery';
import { useQueryBusiness } from '@/hooks/useBusinessQuery';
import { ThemeContextProps } from '@/interfaces/context.interface';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const BusinessSection = ({ theme }: ThemeContextProps) => {
  const { id = '' } = useParams();

  // Fetch business data
  const { fetchBusinessById } = useQueryBusiness();
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(id);

  // Fetch products data
  const { fetchProducts } = useQueryProduct();
  const { data: products, isLoading: isLoadingProducts } = fetchProducts(id);

  if (isLoadingBusiness || isLoadingProducts) {
    return (
      <div className={cn(
        'flex items-center justify-center min-h-screen',
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      )}>
        <p className={cn(
          'text-lg font-medium',
          theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
        )}>
          Cargando...
        </p>
      </div>
    );
  }

  if (!business) {
    return (
      <div className={cn(
        'flex items-center justify-center min-h-screen',
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      )}>
        <p className={cn(
          'text-lg font-medium text-red-500'
        )}>
          Negocio no encontrado
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      'min-h-screen',
      theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
    )}>
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
  );
}