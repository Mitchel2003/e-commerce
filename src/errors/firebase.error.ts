import ErrorAPI, { Conflict, Validation, Unauthorized, NotFound, defaultRecord, ErrorRecord } from '@/errors'
import { FirebaseError } from 'firebase/app';

class HandlerErrors {
  /**
   * Crea un error personalizado basado en el código y mensaje de Firebase
   * @param {FirebaseError} e: error de tipo FirebaseError
   * @returns {ErrorAPI} retorna un error de tipo ErrorAPI
   */
  public static get(e: FirebaseError): ErrorAPI {
    const message = 'Error interno del servidor (firebase)'
    const record = this.errorRecords[e.code] || defaultRecord(message, e.code)
    return new record.errorType({ message: record.message });
  }

  /** Mapeo de errores de Firebase a errores personalizados */
  private static readonly errorRecords: Record<string, ErrorRecord> = {
    'auth/email-already-in-use': {
      message: 'El correo electrónico ya está en uso',
      errorType: Conflict
    },
    'auth/invalid-email': {
      message: 'El correo electrónico no es válido',
      errorType: Validation
    },
    'auth/operation-not-allowed': {
      message: 'Operación no permitida',
      errorType: Unauthorized
    },
    'auth/weak-password': {
      message: 'La contraseña es demasiado débil',
      errorType: Validation
    },
    'auth/user-disabled': {
      message: 'La cuenta de usuario ha sido deshabilitada',
      errorType: Unauthorized
    },
    'auth/user-not-found': {
      message: 'Usuario no encontrado',
      errorType: NotFound
    },
    'auth/wrong-password': {
      message: 'Contraseña incorrecta',
      errorType: Validation
    },
    'auth/invalid-credential': {
      message: 'Credenciales inválidas',
      errorType: Validation
    },
    'auth/invalid-verification-code': {
      message: 'Código de verificación inválido',
      errorType: Validation
    },
    'auth/invalid-verification-id': {
      message: 'ID de verificación inválido',
      errorType: Validation
    },
    'auth/missing-verification-code': {
      message: 'Falta el código de verificación',
      errorType: Validation
    },
    'auth/missing-verification-id': {
      message: 'Falta el ID de verificación',
      errorType: Validation
    },
    'auth/phone-number-already-exists': {
      message: 'El número de teléfono ya existe',
      errorType: Conflict
    },
    'auth/invalid-phone-number': {
      message: 'Número de teléfono inválido',
      errorType: Validation
    },
    'auth/missing-phone-number': {
      message: 'Falta el número de teléfono',
      errorType: Validation
    }
  }
}

//Uso de bind() es para mantener el contexto de la clase
export default HandlerErrors.get.bind(HandlerErrors)