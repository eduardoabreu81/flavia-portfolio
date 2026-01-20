// Firebase Configuration
// TODO: Adicionar credenciais do Firebase quando estiverem disponíveis

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

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
let auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase não inicializado. Configure as variáveis de ambiente.");
}

// Emails autorizados para acesso admin
const AUTHORIZED_EMAILS = [
  'eduardoabreu81@gmail.com',
  'frffonseca77@gmail.com',
  'contato@draflaviaabreu.com'
];

// Função para verificar se o email é autorizado
export function isAuthorizedEmail(email: string | null): boolean {
  if (!email) return false;
  return AUTHORIZED_EMAILS.includes(email.toLowerCase());
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

// Funções de autenticação
export async function signInWithGoogle() {
  if (!auth) throw new Error("Firebase não configurado");
  
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    
    if (!isAuthorizedEmail(email)) {
      await firebaseSignOut(auth);
      throw new Error("Email não autorizado para acesso admin");
    }
    
    return result.user;
  } catch (error: any) {
    console.error("Erro no login:", error);
    throw error;
  }
}

export async function signOut() {
  if (!auth) throw new Error("Firebase não configurado");
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: any) => void) {
  if (!auth) throw new Error("Firebase não configurado");
  return onAuthStateChanged(auth, callback);
}

// Funções para buscar dados
export async function getEbookLeads() {
  if (!db) throw new Error("Firebase não configurado");
  
  const q = query(collection(db, "ebook_leads"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getContactMessages() {
  if (!db) throw new Error("Firebase não configurado");
  
  const q = query(collection(db, "contact_messages"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function updateMessageStatus(messageId: string, status: string) {
  if (!db) throw new Error("Firebase não configurado");
  
  const messageRef = doc(db, "contact_messages", messageId);
  await updateDoc(messageRef, { status });
}

export { db, auth };
