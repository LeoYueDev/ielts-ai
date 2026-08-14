import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/session"
import { decryptSecret, encryptSecret, maskApiKey } from "@/lib/crypto"

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { openaiApiKeyEncrypted: true },
  })

  let hasKey = Boolean(user?.openaiApiKeyEncrypted)
  let masked: string | null = null

  if (user?.openaiApiKeyEncrypted) {
    const decrypted = await decryptSecret(user.openaiApiKeyEncrypted)
    if (!decrypted) {
      hasKey = false
    } else {
      masked = maskApiKey(decrypted)
    }
  }

  return NextResponse.json({ hasKey, masked })
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const apiKey = (body?.apiKey as string | undefined)?.trim()
  if (!apiKey) {
    return NextResponse.json({ error: "API Key 不能为空" }, { status: 400 })
  }

  const encrypted = await encryptSecret(apiKey)
  await prisma.user.update({
    where: { id: session.sub },
    data: { openaiApiKeyEncrypted: encrypted },
  })

  return NextResponse.json({ success: true, masked: maskApiKey(apiKey) })
}

export async function DELETE() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 })
  }

  await prisma.user.update({
    where: { id: session.sub },
    data: { openaiApiKeyEncrypted: null },
  })

  return NextResponse.json({ success: true })
}
