import { initializeApp } from 'firebase/app';
import { getAuth }         from 'firebase/auth';
import { getFirestore }    from 'firebase/firestore';
import { getDatabase }     from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAZYCn1dMil9MRPg-lrmZ3MJ-HEsA6R3gM",
  authDomain: "proyectofinal-3cbd5.firebaseapp.com",
  projectId: "proyectofinal-3cbd5",
  storageBucket: "proyectofinal-3cbd5.firebasestorage.app",
  messagingSenderId: "944095154932",
  appId: "1:944095154932:web:abdb03db4b124faf42c4a1",
  measurementId: "G-94ZN0V74X0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);    
const rtdb = getDatabase(app);    

export { auth, db, rtdb };
