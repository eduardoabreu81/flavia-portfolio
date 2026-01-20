// Firebase Configuration
// TODO: Adicionar credenciais do Firebase quando estiverem disponíveis

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase config - será preenchido com as credenciais reais
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase não inicializado. Configure as variáveis de ambiente.");
}

// Função para salvar lead do e-book
export async function saveEbookLead(data: {
  name: string;
  email: string;
  phone?: string;
}) {
  if (!db) {
    console.error("Firebase não configurado");
    throw new Error("Firebase não configurado");
  }

  try {
    const docRef = await addDoc(collection(db, "ebook_leads"), {
      ...data,
      timestamp: serverTimestamp(),
      source: "landing_page"
    });
    console.log("Lead salvo com ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    throw error;
  }
}

// Função para salvar mensagem de contato
export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  if (!db) {
    console.error("Firebase não configurado");
    throw new Error("Firebase não configurado");
  }

  try {
    const docRef = await addDoc(collection(db, "contact_messages"), {
      ...data,
      timestamp: serverTimestamp(),
      status: "new"
    });
    console.log("Mensagem salva com ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
    throw error;
  }
}

export { db };
