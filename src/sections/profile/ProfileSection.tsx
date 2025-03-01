import { useUpdateBusinessForm, useUpdateBusinessImageForm } from '@/hooks/auth/useRegisterForm'
import { Business, ThemeContextProps } from '@/interfaces/context.interface'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import { RenderFormat } from '@/utils/RenderFormat'
import { FormProvider } from 'react-hook-form'
import { cn } from '@/lib/utils'

import DashboardSkeleton from '#/common/skeletons/DashboardSkeleton'
import SubmitFooter from '#/common/elements/SubmitFooter'
import HeaderForm from '#/common/elements/HeaderForm'
import { Card, CardContent } from '#/ui/card'

import SocialProfileSection from './SocialProfileSection'
import PhotoProfileSection from './PhotoProfileSection'
import DataProfileSection from './DataProfileSection'

interface ProfileSectionProps extends ThemeContextProps {
  idBusiness: string
}
const ProfileSection = ({ theme, idBusiness }: ProfileSectionProps) => {
  const { fetchBusinessById } = useQueryBusiness()
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(idBusiness)

  const { methods: methodsUpdate, onSubmit: onSubmitUpdate } = useUpdateBusinessForm(business as Business)
  const { methods: methodsUpdateImage, onSubmit: onSubmitUpdateImage } = useUpdateBusinessImageForm(idBusiness)

  if (isLoadingBusiness) return <DashboardSkeleton theme={theme} />

  return (
    <div className="flex flex-col">
      {/* data */}
      <FormProvider {...methodsUpdate}>
        <form onSubmit={onSubmitUpdate}>
          <Card className={cn(
            'my-6 w-full lg:w-[calc(100vw-300px)]',
            'transition-all duration-300',
            'backdrop-filter backdrop-blur-lg',
            theme === 'dark'
              ? 'bg-zinc-800 hover:shadow-gray-900/60'
              : 'bg-white hover:shadow-purple-500/60'
          )}>
            <HeaderForm
              theme={theme}
              title="Actualiza tu perfil"
              description="Diligencia la información correspondiente, para que tu negocio sea visible para los usuarios"
            />

            <CardContent className="pt-6 space-y-8">
              <RenderFormat
                format={[
                  <DataProfileSection theme={theme} />,
                  <SocialProfileSection theme={theme} />,
                ]}
              />
            </CardContent>

            <SubmitFooter theme={theme} />
          </Card>
        </form>
      </FormProvider>

      {/* images */}
      <FormProvider {...methodsUpdateImage}>
        <form onSubmit={onSubmitUpdateImage}>
          <Card className={cn(
            'my-6 w-full lg:w-[calc(100vw-300px)]',
            'transition-all duration-300',
            'backdrop-filter backdrop-blur-lg',
            theme === 'dark'
              ? 'bg-zinc-800 hover:shadow-gray-900/60'
              : 'bg-white hover:shadow-purple-500/60'
          )}>
            <HeaderForm
              theme={theme}
              title="Actualiza tus imágenes"
              description="Añade o elimina las imágenes de tu negocio"
            />

            <CardContent className="pt-6 space-y-8">
              <RenderFormat
                format={[
                  <PhotoProfileSection
                    theme={theme}
                    idBusiness={idBusiness}
                  />
                ]}
              />
            </CardContent>

            <SubmitFooter theme={theme} />
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}

export default ProfileSection