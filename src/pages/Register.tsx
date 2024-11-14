import RegisterSection from "@/sections/register/RegisterSection"
import { useThemeContext } from "@/context/ThemeContext"
import { useAuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Register = () => {
  const { theme } = useThemeContext()
  const { isAuth } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/cvs')
  }, [isAuth, navigate])

  return (
    <RegisterSection theme={theme} />
  )
}

export default Register