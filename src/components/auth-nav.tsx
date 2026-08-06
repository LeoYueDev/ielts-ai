"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut } from "lucide-react"

interface User {
  id: string
  name: string | null
  email: string
}

export function AuthNav() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (active) setUser(data.user)
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-sm font-medium md:inline">
          {user.name || user.email}
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-1 h-4 w-4" />
          退出
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="ghost">登录</Button>
      </Link>
      <Link href="/register">
        <Button>注册</Button>
      </Link>
    </div>
  )
}