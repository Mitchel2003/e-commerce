import { useSearchParams } from 'react-router-dom'
import { getUid } from '@/utils/urlParser'
import { useEffect } from 'react'

export default function VerifyAction() {
  const [searchParams] = useSearchParams()
  const continueUrl = searchParams.get('continueUrl')
  const oobCode = searchParams.get('oobCode')
  const mode = searchParams.get('mode')

  useEffect(() => { validateAction() }, [])
  const validateAction = async () => {
    const uid = getUid(continueUrl)
    console.log(mode, oobCode)
    console.log(uid)
  }

  return <div>Verificando acción...</div>
}