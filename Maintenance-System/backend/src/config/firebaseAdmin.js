// src/config/firebaseAdmin.js
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync(new URL('./firebase-service-account.json', import.meta.url))
);

// Verifica se já não foi inicializado antes
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const authAdmin = getAuth();