import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/db"
import { verifyPassword, createSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body as { email?: string; password?: string }

    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase()
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 })
    }

    const token = await createSession({
      sub: user.id,
      email: user.email,
      name: user.name,
    })

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    })

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "登录失败，请稍后重试" }, { status: 500 })
  }
}