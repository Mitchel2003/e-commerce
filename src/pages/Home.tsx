import { useThemeContext } from '@/context/ThemeContext'
import { useAuthContext } from '@/context/AuthContext'
import HomeSection from '@/sections/home/HomeSection'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  const { theme } = useThemeContext()
  const { isAuth } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => { if (isAuth) navigate('/dashboard') }, [isAuth])

  return <HomeSection theme={theme} />
}

export default Home