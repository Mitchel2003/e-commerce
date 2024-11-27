import { LoginComponentsProps } from "@/interfaces/props.interface";
import ForgotPassword from "#/common/dialogs/ForgotPassword";
import { CardFooter } from "#/ui/card";
import { cn } from "@/lib/utils";

const FooterSection = ({ theme }: LoginComponentsProps) => {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-sm text-center">
        <ForgotPassword
          theme={theme}
          trigger={
            <button
              type="button"
              className={cn(
                'font-medium transition-colors duration-300',
                theme === 'dark'
                  ? 'text-purple-100 hover:text-purple-200'
                  : 'text-purple-600 hover:text-purple-500'
              )}
            >
              ¿Olvidaste tu contraseña?
            </button>
          }
        />
      </div>
    </CardFooter>
  )
}

export default FooterSection