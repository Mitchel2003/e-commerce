export default {
  frontendUrl: import.meta.env.VITE_FRONTEND_URL,

  //firebase config
  firebaseConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
  //firebase storage config (GS)
  storageConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_STORAGE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_STORAGE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_STORAGE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_STORAGE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_STORAGE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_STORAGE_MEASUREMENT_ID,
  }
}