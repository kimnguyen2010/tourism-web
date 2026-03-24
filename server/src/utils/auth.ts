import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const HASH_KEY_LENGTH = 64;

export function normalizeEmail(email: string) {
  return String(email || "").trim().toLowerCase();
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, HASH_KEY_LENGTH).toString("hex");

  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedKey] = String(passwordHash).split(":");

  if (!salt || !storedKey) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, HASH_KEY_LENGTH);
  const storedBuffer = Buffer.from(storedKey, "hex");

  return storedBuffer.length === derivedKey.length && timingSafeEqual(storedBuffer, derivedKey);
}

export function createSessionToken() {
  return createHash("sha256").update(randomBytes(32)).digest("hex");
}

export function extractBearerToken(authHeader: string) {
  const value = String(authHeader || "");

  if (!value.startsWith("Bearer ")) {
    return null;
  }

  return value.slice(7).trim() || null;
}
