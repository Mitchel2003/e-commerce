import dotenv from "dotenv"
dotenv.config()

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL as string,
  jwtSecret: process.env.TOKEN_SECRET as string,
  mongodbUri: process.env.MONGODB_URI as string,
  //firebase config
  firebaseConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  }
};
