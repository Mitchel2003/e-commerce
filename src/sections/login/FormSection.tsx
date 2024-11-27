import { LoginComponentsProps } from '@/interfaces/props.interface'

import InputField from '#/common/fields/Input'
import { CardContent } from '#/ui/card'
import { Button } from '#/ui/button'
import { cn } from '@/lib/utils'

import { LogIn, Lock, UserPlus, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FormSection = ({ theme }: LoginComponentsProps) => {
  const navigate = useNavigate()

  return (
    <CardContent className="space-y-6">
      <InputField
        name="email"
        type="email"
        label="Correo electrónico"
        placeholder="@example.com"
        icon={LogIn}
        theme={theme}
      />
      <InputField
        name="password"
        type="password"
        label="Contraseña"
        icon={Lock}
        theme={theme}
      />

      {/* -------------------- Submit -------------------- */}
      <Button
        type="submit"
        className={cn(
          'text-white w-full',
          'transition-all duration-300 transform hover:scale-105',
          theme === 'dark'
            ? 'bg-purple-600 hover:bg-purple-700'
            : 'bg-purple-800 hover:bg-purple-900'
        )}
      >
        Iniciar sesión <ChevronRight className="ml-2 h-4 w-4" />
      </Button>

      {/* -------------------- go to register -------------------- */}
      <Button
        type="button"
        onClick={() => navigate('/auth/register')}
        className={cn(
          'text-white w-full',
          'transition-all duration-300 transform hover:scale-105',
          theme === 'dark'
            ? 'bg-purple-800 hover:bg-purple-900'
            : 'bg-purple-400 hover:bg-purple-500'
        )}
      >
        Registrarse <UserPlus className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  )
}

export default FormSection