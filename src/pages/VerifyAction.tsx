import ResetPassword from '@/sections/verify/VerifyResetSection'
import VerifyEmail from '@/sections/verify/VerifyEmailSection'
import { useThemeContext } from '@/context/ThemeContext'
import { useSearchParams } from 'react-router-dom'

const VerifyAction = () => {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const { theme } = useThemeContext()

  if (mode === 'verifyEmail') return <VerifyEmail theme={theme} />
  if (mode === 'resetPassword') return <ResetPassword theme={theme} />

  return <div>Verificando acción...</div>
}

export default VerifyAction