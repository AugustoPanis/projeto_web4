import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync(new URL('./firebaseServiceAccount.json', import.meta.url))
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const authAdmin = getAuth();