/**
 * visit.queue.service.ts
 * 
 * Sistema de cola para el procesamiento eficiente de visitas a negocios
 * Implementa un patrón Singleton con procesamiento secuencial no bloqueante
 */

import { VisitorIdentifier } from '@/services/analitics/visitor.service'
import { databaseService } from '@/services/firebase/database.service'

interface VisitQueueItem {
  businessId: string
  visitorId?: string
}

/**
 * Servicio de cola para el procesamiento asíncrono y optimizado de visitas
 * Evita bloquear la interfaz de usuario durante el registro de visitas
 */
export class VisitQueueService {
  private visitorsMap = new Map<string, boolean>()
  private static instance: VisitQueueService
  private queue: VisitQueueItem[] = []
  private isProcessing = false

  private constructor() { }

  /** Obtiene la instancia única del servicio de cola de visitas */
  public static getInstance(): VisitQueueService {
    if (!VisitQueueService.instance) VisitQueueService.instance = new VisitQueueService()
    return VisitQueueService.instance
  }

  /**
   * Añade una visita a la cola de procesamiento
   * Opcionalmente puede recibir un visitorId pre-generado
   * @param businessId ID del negocio visitado
   * @param visitorId ID opcional del visitante (si no se proporciona, se generará)
   */
  public enqueueVisit(businessId: string, visitorId?: string): void {
    if (!businessId) return
    if (visitorId) { //verify duplicates
      const key = `${businessId}_${visitorId}`
      if (this.visitorsMap.has(key)) return
      this.visitorsMap.set(key, true)
    }
    this.queue.push({ businessId, visitorId })
    if (!this.isProcessing) this.processQueue() //init processing
  }

  /**
   * Procesa la cola de visitas de forma secuencial
   * Evita sobrecarga del sistema y proporciona tiempos de respuesta consistentes
   */
  private async processQueue(): Promise<void> {
    if (this.queue.length === 0) { this.isProcessing = false; return }
    const { businessId, visitorId: providedVisitorId } = this.queue.shift()!
    this.isProcessing = true
    try { //If dont have visitorId, we generate it
      const visitorId = providedVisitorId || await VisitorIdentifier.getInstance().getVisitorId()
      const key = `${businessId}_${visitorId}`
      //Processing visit function (record visit to business)
      await databaseService.recordBusinessVisit(businessId, visitorId)
      if (providedVisitorId) this.visitorsMap.delete(key) //Clear map entry
    } catch (error) { console.error('Error registrando visita:', error) }
    //Programming the next processing with delay to not block the UI
    setTimeout(() => this.processQueue(), 300)
  }

  /**
   * Limpia la cola de visitas y detiene el procesamiento
   * Útil para escenarios de desmontaje de componentes o pruebas
   */
  public clearQueue(): void {
    this.isProcessing = false
    this.visitorsMap.clear()
    this.queue = []
  }
}

export const visitQueueService = VisitQueueService.getInstance()