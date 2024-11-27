import { useThemeContext } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '#/ui/button';
import { cn } from '@/lib/utils';

const Theme = () => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      className={cn(
        '[&_svg]:size-5',
        'h-9 w-9 md:h-10 md:w-10',
        'rounded-full transition-colors duration-300',
        theme === 'dark'
          ? 'bg-zinc-700/40 text-yellow-500 hover:bg-zinc-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      )}
    >
      {theme === 'dark'
        ? (<Sun className='h-5 w-5 md:h-6 md:w-6' />)
        : (<Moon className='h-5 w-5 md:h-6 md:w-6' />)
      }
    </Button>
  )
}

export default Theme