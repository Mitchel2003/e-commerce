import { initializeApp } from "firebase/app";
import config from "@/utils/config";

export const firebaseApp = initializeApp(config.firebaseConfig);