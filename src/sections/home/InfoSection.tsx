import { ThemeContextProps } from '@/interfaces/context.interface'
import CarouselInfo from '#/home/CarouselInfo'
import { heroItems } from '@/utils/constants'

const InfoSection = ({ theme }: ThemeContextProps) => {
  return (
    <CarouselInfo
      informations={heroItems}
      isLoading={false}
      theme={theme}
      error={null}
    />
  )
}

export default InfoSection