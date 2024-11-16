import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIhbPrKDg4je6pq_DAY52FIoge2iI7cy8",
  authDomain: "ancap-map.firebaseapp.com",
  projectId: "ancap-map",
  storageBucket: "ancap-map.appspot.com",
  messagingSenderId: "306255771606",
  appId: "1:306255771606:web:ac37cc90e38e8bef29d677",
  measurementId: "G-8YX94PZEDV",
};

// Verifica se já existe uma instância inicializada do Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Inicializa o Firebase Auth com persistência para React Native
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializa o Firestore
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore };
