import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAk8iYcirPDmJ59e9zYaSIHbnG9JtxrEB8",
  authDomain: "projetoweb-37006.firebaseapp.com",
  projectId: "projetoweb-37006",
  storageBucket: "projetoweb-37006.firebasestorage.app",
  messagingSenderId: "708853224278",
  appId: "1:708853224278:web:d64f68b06b266abc69bcf7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);