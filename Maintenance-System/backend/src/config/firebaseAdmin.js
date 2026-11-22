import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
    readFileSync('/etc/secrets/firebaseServiceAccount.json', 'utf-8')
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const authAdmin = getAuth();