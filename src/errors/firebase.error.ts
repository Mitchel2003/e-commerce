import ErrorAPI, { Conflict, Validation, Unauthorized, NotFound, defaultRecord, ErrorRecord } from '@/errors'
import { FirebaseError } from 'firebase/app';

class HandlerErrors {
  /**
   * Crea un error personalizado basado en el código y mensaje de Firebase
   * @param {FirebaseError} e: error de tipo FirebaseError
   * @returns {ErrorAPI} retorna un error de tipo ErrorAPI
   */
  public static get(e: FirebaseError): ErrorAPI {
    const context = 'Error interno del servidor (firebase)'
    const record = this.errorRecords[e.code] || defaultRecord(context, e.message)
    return new record.errorType({ message: record.message });
  }

  /** Mapeo de errores de Firebase a errores personalizados */
  private static readonly errorRecords: Record<string, ErrorRecord> = {
    //authentication
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
    },

    //storage
    'storage/unauthorized': {
      message: 'No tienes permisos para acceder a este recurso',
      errorType: Unauthorized
    },
    'storage/canceled': {
      message: 'Operación cancelada por el usuario',
      errorType: ErrorAPI
    },
    'storage/unknown': {
      message: 'Error desconocido en el almacenamiento',
      errorType: ErrorAPI
    },
    'storage/object-not-found': {
      message: 'Archivo no encontrado en el almacenamiento',
      errorType: NotFound
    },
    'storage/bucket-not-found': {
      message: 'Bucket de almacenamiento no encontrado',
      errorType: NotFound
    },
    'storage/project-not-found': {
      message: 'Proyecto no encontrado',
      errorType: NotFound
    },
    'storage/quota-exceeded': {
      message: 'Cuota de almacenamiento excedida',
      errorType: ErrorAPI
    },
    'storage/invalid-checksum': {
      message: 'El archivo está corrupto o ha sido modificado',
      errorType: Validation
    },
    'storage/invalid-event-name': {
      message: 'Nombre de evento inválido',
      errorType: Validation
    },
    'storage/invalid-url': {
      message: 'URL de almacenamiento inválida',
      errorType: Validation
    },
    'storage/invalid-argument': {
      message: 'Argumento inválido en operación de almacenamiento',
      errorType: Validation
    },
    'storage/no-default-bucket': {
      message: 'No se ha configurado un bucket por defecto',
      errorType: ErrorAPI
    },
    'storage/cannot-slice-blob': {
      message: 'Error al procesar el archivo',
      errorType: ErrorAPI
    },
    'storage/server-file-wrong-size': {
      message: 'El archivo subido no coincide con el tamaño esperado',
      errorType: Validation
    },

    //realtime database
    'database/permission-denied': {
      message: 'No tienes permisos para realizar esta operación en la base de datos',
      errorType: Unauthorized
    },
    'database/disconnected': {
      message: 'Operación fallida por desconexión con la base de datos',
      errorType: ErrorAPI
    },
    'database/network-error': {
      message: 'Error de red al conectar con la base de datos',
      errorType: ErrorAPI
    },
    'database/operation-failed': {
      message: 'La operación en la base de datos ha fallado',
      errorType: ErrorAPI
    },
    'database/timeout': {
      message: 'Tiempo de espera agotado para la operación',
      errorType: ErrorAPI
    },
    'database/invalid-argument': {
      message: 'Argumento inválido en operación de base de datos',
      errorType: Validation
    },
    'database/write-canceled': {
      message: 'Operación de escritura cancelada',
      errorType: ErrorAPI
    },
    'database/data-stale': {
      message: 'Los datos no están actualizados',
      errorType: Conflict
    },
    'database/transaction-aborted': {
      message: 'Transacción abortada',
      errorType: ErrorAPI
    },
    'database/user-code-exception': {
      message: 'Error en el código de usuario',
      errorType: ErrorAPI
    },
    'database/max-retries': {
      message: 'Número máximo de reintentos alcanzado',
      errorType: ErrorAPI
    },
    'database/overridden-by-set': {
      message: 'Operación sobrescrita por una nueva actualización',
      errorType: Conflict
    }
  }
}

//Uso de bind() es para mantener el contexto de la clase
export default HandlerErrors.get.bind(HandlerErrors)