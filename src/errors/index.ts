/** Error base personalizado para la aplicación */
export default class ErrorAPI extends Error {
  public readonly code?: string
  public readonly details?: unknown
  public readonly statusCode: number

  constructor({ message, statusCode = 500, code, details }: ErrorProps) {
    super(message);
    this.code = code
    this.details = details
    this.statusCode = statusCode
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/** Error específico para operaciones no autorizadas */
export class Unauthorized extends ErrorAPI {
  constructor({ message }: ErrorProps) {
    super({ message, statusCode: 401, code: 'UNAUTHORIZED' })
  }
}

/** Error específico para recursos no encontrados */
export class NotFound extends ErrorAPI {
  constructor({ message }: ErrorProps) {
    super({ message: `${message} no encontrado`, statusCode: 404, code: 'NOT_FOUND' })
  }
}

/** Error específico para validación de datos */
export class Validation extends ErrorAPI {
  constructor({ message, details }: ErrorProps) {
    super({ message, statusCode: 400, code: 'VALIDATION_ERROR', details })
  }
}

/** Error específico para conflictos en operaciones */
export class Conflict extends ErrorAPI {
  constructor({ message }: ErrorProps) {
    super({ message, statusCode: 409, code: 'CONFLICT' })
  }
}

/** Propiedades del error */
export interface ErrorProps {
  message: string,
  code?: string,
  details?: unknown,
  statusCode?: number,
}

/** Registro de error Record<> */
export interface ErrorRecord {
  message: string;
  errorType:
  | typeof Unauthorized
  | typeof Validation
  | typeof Conflict
  | typeof NotFound
  | typeof ErrorAPI;
}

/**
 * Regresa un registro de error por defecto.
 * La idea de definir "details" como un objeto de codigo es debido a que se desconoce la procedencia del error.
 * Entonces en vez de mostrar directamente en "code", pasamos el codigo a traves de "details" para mayor flexibilidad.
 * @param {string} message: mensaje del error (Error interno del servidor)
 * @param {string} code: código del error (UNAUTHORIZED, NOT_FOUND, VALIDATION_ERROR, CONFLICT)
*/
export function defaultRecord(message: string, code: string): unknown {
  return { message, details: { code }, errorType: ErrorAPI }
}