import { LoginComponentsProps } from "@/interfaces/props.interface";
import { CardFooter } from "#/ui/card";

const FooterSection = ({ theme }: LoginComponentsProps) => {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-sm text-center">
        <a
          href="#"
          className={`font-medium transition-colors duration-300
            ${theme === 'dark'
              ? 'text-purple-100 hover:text-purple-200'
              : 'text-purple-600 hover:text-purple-500'
            }`}
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </CardFooter>
  )
}

export default FooterSection