import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-in-production-please"
)

export async function verifyToken(token: string): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return { sub: payload.sub as string }
  } catch {
    return null
  }
}