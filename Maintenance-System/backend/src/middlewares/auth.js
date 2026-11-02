import { authAdmin } from '../config/firebaseAdmin.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return res.status(401).json({ code: 'UNAUTHENTICATED' });

  try {
    req.user = await authAdmin.verifyIdToken(token);
    next();
  } catch (err) {
    console.error(err.code, err.message);
    res.status(401).json({ code: 'INVALID_TOKEN' });
  }
}