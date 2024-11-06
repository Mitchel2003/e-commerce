// import { useThemeContext } from "@/context/ThemeContext"
import { useAuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
// import RegisterSection from "@/sections/register"

const Register = () => {
  // const { theme } = useThemeContext()
  const { isAuth } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/cvs')
  }, [isAuth, navigate])

  return (
    <div className="w-full max-w-md relative">
      {/* <RegisterSection theme={theme} /> */}
    </div>
  )
}

export default Register