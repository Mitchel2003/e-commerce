import { getBusinesses, getBusinessById, getBusinessByQuery } from '@/controllers/business.controller'
import { BusinessContext } from '@/interfaces/context.interface'
import { isFirebaseResponse } from '@/interfaces/db.interface'
import { useNotification } from '@/hooks/ui/useNotification'
import { useLoadingScreen } from '@/hooks/ui/useLoading'
import { Props } from '@/interfaces/props.interface'
import { createContext, useContext } from 'react'

const Business = createContext<BusinessContext>(undefined)

export const useBusinessContext = () => {
  const context = useContext(Business)
  if (!context) throw new Error('Error al intentar usar businessContext')
  return context
}

export const BusinessProvider = ({ children }: Props) => {
  const { show: showLoading, hide: hideLoading } = useLoadingScreen()
  const { notifyError } = useNotification()

  const setLoadingStatus = (status?: string) => {
    status ? showLoading(status) : hideLoading()
  }

  return (
    <Business.Provider value={{
      loading: false,
      businesses: [],
      getBusinesses: async () => {
        setLoadingStatus('Cargando negocios...')
        try {
          const result = await getBusinesses()
          if (!result.success) throw result.error
          return result.data
        } catch (e) {
          if (isFirebaseResponse(e)) {
            notifyError({ title: 'Error', message: e.message })
          }
          return []
        } finally {
          setLoadingStatus()
        }
      },
      getBusinessById: async (id) => {
        setLoadingStatus('Cargando negocio...')
        try {
          const result = await getBusinessById(id)
          if (!result.success) throw result.error
          return result.data
        } catch (e) {
          if (isFirebaseResponse(e)) {
            notifyError({ title: 'Error', message: e.message })
          }
          throw e
        } finally {
          setLoadingStatus()
        }
      },
      getBusinessByQuery: async (query) => {
        setLoadingStatus('Buscando negocios...')
        try {
          const result = await getBusinessByQuery(query)
          if (!result.success) throw result.error
          return result.data
        } catch (e) {
          if (isFirebaseResponse(e)) {
            notifyError({ title: 'Error', message: e.message })
          }
          return []
        } finally {
          setLoadingStatus()
        }
      },
      filterBusinessByCategory: async (category) => {
        // Implementación local del filtro
        const result = await getBusinesses()
        if (!result.success) return []
        return result.data.filter(business =>
          business?.category.toLowerCase().includes(category.toLowerCase())
        )
      }
    }}>
      {children}
    </Business.Provider>
  )
} 