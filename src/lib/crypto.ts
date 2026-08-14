import "server-only"
import { createHash, randomBytes } from "node:crypto"

const APP_SECRET = process.env.AUTH_SECRET || "dev-secret-change-in-production-please"

function deriveKey(): Promise<CryptoKey> {
  const raw = createHash("sha256").update(APP_SECRET).digest()
  return crypto.subtle.importKey(
    "raw",
    raw,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  )
}

export async function encryptSecret(plaintext: string): Promise<string> {
  const enc = new TextEncoder()
  const iv = randomBytes(12)
  const key = await deriveKey()
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plaintext)
  )
  const merged = Buffer.concat([iv, Buffer.from(encrypted)])
  return merged.toString("base64")
}

export async function decryptSecret(payload: string): Promise<string | null> {
  try {
    const merged = Buffer.from(payload, "base64")
    const iv = merged.subarray(0, 12)
    const data = merged.subarray(12)
    const key = await deriveKey()
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    )
    return new TextDecoder().decode(decrypted)
  } catch {
    return null
  }
}

export function maskApiKey(key: string): string {
  if (!key) return ""
  if (key.length <= 8) return "••••"
  return `${key.slice(0, 4)}••••••••${key.slice(-4)}`
}
