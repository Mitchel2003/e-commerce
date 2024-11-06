import { useThemeContext } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from "#/ui/button";

const Theme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full transition-colors duration-300 
        ${theme === 'dark'
          ? 'bg-zinc-700/40 text-yellow-500 hover:bg-zinc-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
      {theme === 'dark'
        ? (<Sun className="h-5 w-5" />)
        : (<Moon className="h-5 w-5" />)
      }
    </Button>
  )
}

export default Theme