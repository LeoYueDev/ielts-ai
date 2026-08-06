import "server-only"

import { cookies } from "next/headers"
import { SESSION_COOKIE, verifySession, type SessionPayload } from "@/lib/auth"

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySession(token)
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null
  return session
}