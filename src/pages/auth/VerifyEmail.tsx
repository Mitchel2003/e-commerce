import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true)
  const { email, token } = useParams()
  useEffect(() => { validateEmail() }, [email, token])

  const validateEmail = async () => {
    console.log(email, token)
    setLoading(false);
  }

  if (loading) return <div>Verificando email...</div>
  return <div>Email verificado correctamente</div>
}