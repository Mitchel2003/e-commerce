import ProfileSection from "@/sections/profile/ProfileSection"
import { useThemeContext } from "@/context/ThemeContext"
import { useParams } from "react-router-dom"

const Profile = () => {
  const { theme } = useThemeContext()
  const { id = '' } = useParams()

  return (
    <ProfileSection
    theme={theme}
    idBusiness={id}
    />
  )
}

export default Profile