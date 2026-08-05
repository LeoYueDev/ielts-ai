"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AuthNav } from "@/components/auth-nav"
import { BookOpen, Headphones, PenTool, MessageSquare, BarChart3, Settings, Home } from "lucide-react"

const navigation = [
  { name: "首页", href: "/", icon: Home },
  { name: "词汇", href: "/vocabulary", icon: BookOpen },
  { name: "听力", href: "/listening", icon: Headphones },
  { name: "阅读", href: "/reading", icon: BookOpen },
  { name: "写作", href: "/writing", icon: PenTool },
  { name: "口语", href: "/speaking", icon: MessageSquare },
  { name: "仪表盘", href: "/dashboard", icon: BarChart3 },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">IELTS 备考助手</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground font-semibold"
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <AuthNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
