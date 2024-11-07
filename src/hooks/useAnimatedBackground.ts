import { ThemeContextProps } from '@/interfaces/context.interface'
import { useSpring } from '@react-spring/web'

export const useAnimatedBackground = ({ theme }: ThemeContextProps) => {
  const springProps = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000 },
    loop: true,
  });

  const gradientColors = theme === 'dark'
    ? ['from-zinc-900', 'via-purple-900', 'to-indigo-900']
    : ['from-white', 'via-purple-100', 'to-indigo-100'];

  return { springProps, gradientColors };
}