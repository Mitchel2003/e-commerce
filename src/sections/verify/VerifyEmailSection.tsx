import { ThemeContextProps } from '@/interfaces/context.interface'
import HeaderForm from '@/components/common/elements/HeaderForm'
import { useAuthContext } from "@/context/AuthContext"
import { Card, CardContent } from '#/ui/card'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { getParams } from '@/utils/urlParser'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'


const VerifyEmail = ({ theme }: ThemeContextProps) => {
  const [searchParams] = useSearchParams()
  const continueUrl = searchParams.get('continueUrl')
  const { loading, verifyAction } = useAuthContext()

  useEffect(() => { validateEmail() }, [continueUrl])

  const validateEmail = async () => {
    const userCredentials = getParams(continueUrl)
    await verifyAction('verifyEmail', userCredentials)
  }

  return (
    <Card
      className={cn(
        'relative w-full my-10',
        'transition-all duration-300',
        'backdrop-filter backdrop-blur-lg',
        theme === 'dark'
          ? 'bg-zinc-800/90 hover:shadow-purple-900/60'
          : 'bg-white hover:shadow-purple-500/60'
      )}
    >
      <HeaderForm
        theme={theme}
        title="Verificación de Email"
        className="bg-transparent/0"
        description="Estado de la verificación de tu cuenta"
      />
      <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
        <StatusIcon
          theme={theme}
          loading={loading}
        />
        <StatusMessage
          theme={theme}
          loading={loading}
        />
      </CardContent>
    </Card>
  )
}

export default VerifyEmail

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface StatusProps {
  loading: boolean
  theme: string
}

const StatusIcon = ({ theme, loading }: StatusProps) => {
  const Icon = loading ? Loader2 : CheckCircle2
  return (
    <div
      className={cn(
        'relative rounded-full p-4',
        'transition-all duration-300',
        theme === 'dark' ? 'bg-zinc-700/50' : 'bg-gray-100'
      )}
    >
      <Icon
        className={cn(
          'w-16 h-16',
          loading
            ? 'text-blue-500 animate-spin'
            : 'text-green-500'
        )}
      />
    </div>
  )
}

const StatusMessage = ({ theme, loading }: StatusProps) => {
  const message = loading
    ? 'Verificando tu email...'
    : '¡Email verificado correctamente!'
  return (
    <p
      className={cn(
        'text-center text-lg font-medium',
        theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
      )}
    >
      {message}
    </p>
  )
}