import { LoginComponentsProps } from "@/interfaces/props.interface";
import ForgotPassword from "#/common/dialogs/ForgotPassword";
import { CardFooter } from "#/ui/card";

const FooterSection = ({ theme }: LoginComponentsProps) => {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-sm text-center">
        <ForgotPassword theme={theme} />
      </div>
    </CardFooter>
  )
}

export default FooterSection