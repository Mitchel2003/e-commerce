import { useAnimatedBackground } from '@/hooks/useAnimatedBackground'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { AnimatedParticles } from '@/components/others/background/ParticlesBackground'
import { Props } from '@/interfaces/props.interface'
import { animated } from '@react-spring/web'
import { cn } from '@/lib/utils'

export const AnimatedBackground = ({ children, theme }: ThemeContextProps & Props) => {
  const { springProps, gradientColors } = useAnimatedBackground({ theme })

  return (
    <animated.div
      style={springProps}
      className={cn(
        'relative min-h-screen flex flex-col',
        'bg-gradient-to-br transition-colors duration-1000',
        gradientColors.join(' ')
      )}
    >
      <AnimatedParticles theme={theme} />
      {children}
    </animated.div>
  )
}