import { ThemeContextProps } from '@/interfaces/context.interface'
import CarouselInfo from '@/components/home/CarouselInfo'
import { heroItems } from '@/utils/constants'

const InfoSection = ({ theme }: ThemeContextProps) => {
  return (
    <CarouselInfo
      informations={heroItems}
      isLoading={false}
      error={null}
      theme={theme}
    />
  )
}

export default InfoSection