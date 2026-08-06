import "server-only"

import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-in-production-please"
)

export const SESSION_COOKIE = "ielts_session"
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface SessionPayload {
  sub: string
  email: string
  name: string | null
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email, name: payload.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret)
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      name: (payload.name as string | null) ?? null,
    }
  } catch {
    return null
  }
}

export const SESSION_MAX_AGE = MAX_AGE