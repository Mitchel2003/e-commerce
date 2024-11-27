import SubmitFooter from '#/common/fields/SubmitFooter'
import HeaderForm from '#/common/elements/HeaderForm'
import { Card, CardContent } from '#/ui/card'

import SocialNetworkSection from './SocialNetworkSection'
import BusinessDataSection from './BusinessDataSection'
import CredentialsSection from './CredentialsSection'
import PhotoSection from './PhotoSection'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { useRegisterForm } from '@/hooks/auth/useRegisterForm'
import { RenderFormat } from '@/utils/RenderFormat'
import { FormProvider } from 'react-hook-form'
import { cn } from '@/lib/utils'

const RegisterSection = ({ theme }: ThemeContextProps) => {
  const { methods, onSubmit } = useRegisterForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Card className={cn(
          'my-6 w-full shadow-lg',
          'transition-all duration-200 backdrop-filter backdrop-blur-lg',
          theme === 'dark'
            ? 'bg-zinc-800 hover:shadow-gray-900'
            : 'bg-purple-50 hover:shadow-purple-500/60'
        )}>
          <HeaderForm
            theme={theme}
            title="Registro de usuario"
            description="Diligencia la información correspondiente"
          />

          <CardContent className="pt-6 space-y-8">
            <RenderFormat
              format={[
                <CredentialsSection theme={theme} />,
                <BusinessDataSection theme={theme} />,
                <PhotoSection theme={theme} />,
                <SocialNetworkSection theme={theme} />
              ]}
            />
          </CardContent>

          <SubmitFooter theme={theme} />
        </Card>
      </form>
    </FormProvider>
  )
}

export default RegisterSection