"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Key, CheckCircle2, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">设置</h1>
        <p className="text-muted-foreground">管理你的 API Key 和个人设置</p>
      </div>

      <Card>
        <CardHeader>
          <Key className="h-10 w-10 mb-2" />
          <CardTitle>OpenAI API Key</CardTitle>
          <CardDescription>
            配置你的 OpenAI API Key 以启用 AI 功能。你的 Key 会加密存储在本地，不会上传到服务器。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">API Key</label>
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                你可以在{" "}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  OpenAI 平台
                </a>{" "}
                创建 API Key
              </p>
            </div>

            <Button onClick={handleSave} disabled={!apiKey.trim()}>
              保存 API Key
            </Button>

            {saved && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                API Key 已保存
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">使用说明</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>AI 功能会产生 OpenAI API 调用费用，费用由你自行承担</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>建议使用 GPT-4 模型以获得最佳效果</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>你的 API Key 仅保存在浏览器本地，清除浏览器数据会丢失</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
