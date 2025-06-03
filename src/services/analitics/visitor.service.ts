/**
 * visitor.service.ts
 * 
 * Servicio para la generación de identificadores únicos de visitantes y gestión de visitas
 * Implementa un sistema de fingerprinting avanzado con protección contra duplicados
 */
import FingerprintJS from '@fingerprintjs/fingerprintjs'

/**
 * Clase para identificación de visitantes únicos usando fingerprinting
 * Combina la huella digital del navegador con otros factores para crear IDs persistentes
 */
export class VisitorIdentifier {
  private fetchPromise: Promise<string> | null = null
  private static instance: VisitorIdentifier
  private visitorId: string | null = null
  private isFetching: boolean = false
  private fpPromise: Promise<any>

  private constructor() {
    this.fpPromise = FingerprintJS.load()
    //Intentar recuperar el ID de localStorage para evitar operaciones costosas
    const storedId = localStorage.getItem('visitor_fingerprint')
    if (storedId) this.visitorId = storedId
  }

  /** Obtiene la instancia singleton del identificador de visitantes */
  public static getInstance(): VisitorIdentifier {
    if (!VisitorIdentifier.instance) VisitorIdentifier.instance = new VisitorIdentifier()
    return VisitorIdentifier.instance
  }

  /**
   * Genera un ID único para el visitante actual
   * Este ID se mantendrá consistente incluso tras cerrar el navegador
   * Implementa un sistema de caché en memoria para mejorar rendimiento
   */
  public async getVisitorId(): Promise<string> {
    // 1. Si ya hay una solicitud en curso, reutilizarla para evitar duplicados
    if (this.isFetching && this.fetchPromise) return this.fetchPromise
    // 2. Retornar de memoria si ya lo tenemos (más rápido)
    if (this.visitorId) return this.visitorId
    this.isFetching = true //get new visitor id
    this.fetchPromise = this.generateVisitorId()
    return this.fetchPromise
  }

  /**
   * Método interno para generar el ID del visitante
   * Separado para permitir mejor manejo de caché y concurrencia
   */
  private async generateVisitorId(): Promise<string> {
    try { //Primero intentamos recuperar de localStorage
      const storedId = localStorage.getItem('visitor_fingerprint')
      if (storedId) { this.visitorId = storedId; return storedId }
      //Si no está en localStorage, generamos uno nuevo
      const fp = await this.fpPromise
      const result = await fp.get()
      // Almacenamos en memoria y localStorage
      this.visitorId = result.visitorId as string
      localStorage.setItem('visitor_fingerprint', this.visitorId)
      return this.visitorId
    } catch (error) {
      console.error('Error generando el fingerprint del visitante:', error)
      const fallbackId = `fallback-${Math.random().toString(36).substring(2, 15)}`
      this.visitorId = fallbackId
      return fallbackId
    } finally {
      this.isFetching = false
      this.fetchPromise = null
    }
  }
}

/**
 * Clase para gestionar el registro de visitas a páginas de negocios
 * Implementa lógica para evitar conteos duplicados del mismo visitante
 * Optimizada con sistema de caché en memoria para mejorar rendimiento
 */
export class BusinessVisitTracker {
  private static readonly STORAGE_KEY_PREFIX = 'business_visit_'; //Prefix for localStorage keys
  private static visitCache = new Map<string, number>(); // Caché en memoria: cacheKey -> timestamp
  private static readonly VISIT_COOLDOWN_HOURS = 24; // Tiempo mínimo entre visitas válidas

  /**
   * Comprueba si la visita actual debe contabilizarse como nueva
   * Implementa un sistema de caché de múltiples niveles para optimizar rendimiento:
   * 1. Caché en memoria (Map) - Más rápido, no persiste entre sesiones
   * 2. localStorage - Persiste entre sesiones del mismo navegador
   * 3. Firestore - Verificación del lado del servidor (implementada en database.service)
   */
  public static async shouldCountVisit(businessId: string): Promise<boolean> {
    const visitorId = await VisitorIdentifier.getInstance().getVisitorId()
    const cacheKey = `${businessId}_${visitorId}`
    const currentTime = Date.now()

    const cachedTimestamp = this.visitCache.get(cacheKey)
    if (cachedTimestamp) { //Check first in memory cache (fastest)
      const hoursSinceLastVisit = (currentTime - cachedTimestamp) / (1000 * 60 * 60)
      if (hoursSinceLastVisit < this.VISIT_COOLDOWN_HOURS) return false
    }

    //Verify in localStorage as second layer
    const storageKey = `${this.STORAGE_KEY_PREFIX}${cacheKey}`
    const lastVisitTimestamp = localStorage.getItem(storageKey)
    if (lastVisitTimestamp) {
      const lastVisitTime = parseInt(lastVisitTimestamp, 10)
      const hoursSinceLastVisit = (currentTime - lastVisitTime) / (1000 * 60 * 60)
      if (hoursSinceLastVisit < this.VISIT_COOLDOWN_HOURS) return false
    }

    //we must count the visit, and update both caches
    // - update timestamp to start cooldown period
    // - only for this business
    this.visitCache.set(cacheKey, currentTime)
    localStorage.setItem(storageKey, currentTime.toString())
    return true
  }

  /**
   * Genera un objeto con metadatos de la visita actual
   * Útil para análisis avanzados y segmentación
   */
  public static async getVisitMetadata(businessId: string) {
    const visitorId = await VisitorIdentifier.getInstance().getVisitorId()
    return {
      visitorId,
      businessId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer || 'direct',
      screenResolution: `${window.screen.width}x${window.screen.height}`
    }
  }

  public static clearCache(): void { this.visitCache.clear() } /** Clear memory cache */
}
