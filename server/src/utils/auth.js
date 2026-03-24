import crypto from "node:crypto";

const HASH_KEY_LENGTH = 64;

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, HASH_KEY_LENGTH).toString("hex");

  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password, passwordHash) {
  const [salt, storedKey] = String(passwordHash).split(":");

  if (!salt || !storedKey) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, salt, HASH_KEY_LENGTH);
  const storedBuffer = Buffer.from(storedKey, "hex");

  return storedBuffer.length === derivedKey.length && crypto.timingSafeEqual(storedBuffer, derivedKey);
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function extractBearerToken(authHeader) {
  const value = String(authHeader || "");

  if (!value.startsWith("Bearer ")) {
    return null;
  }

  return value.slice(7).trim() || null;
}
