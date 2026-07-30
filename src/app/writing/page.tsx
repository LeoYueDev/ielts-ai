"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { PenTool, Sparkles } from "lucide-react"

export default function WritingPage() {
  const [essay, setEssay] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">写作练习</h1>
        <p className="text-muted-foreground">AI 批改作文，四项评分，逐段反馈</p>
      </div>

      <Tabs defaultValue="task2">
        <TabsList>
          <TabsTrigger value="task1">Task 1</TabsTrigger>
          <TabsTrigger value="task2">Task 2</TabsTrigger>
        </TabsList>
        <TabsContent value="task1" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task 1 题目</CardTitle>
              <CardDescription>小作文 - 图表描述</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The chart below shows the percentage of the population living in cities in four different countries between 1950 and 2050.
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="task2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task 2 题目</CardTitle>
              <CardDescription>大作文 - 议论文</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Some people believe that technology has made our lives more complex and the solution is to lead a simpler life without technology. To what extent do you agree or disagree?
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>我的作文</CardTitle>
            <CardDescription>在下方输入你的作文</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="在这里输入你的作文..."
              className="min-h-[400px]"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                字数: {essay.split(/\s+/).filter(Boolean).length}
              </span>
              <Button onClick={() => setShowFeedback(true)} disabled={!essay.trim()}>
                <Sparkles className="mr-2 h-4 w-4" />
                AI 批改
              </Button>
            </div>
          </CardContent>
        </Card>

        {showFeedback && (
          <Card>
            <CardHeader>
              <CardTitle>AI 批改结果</CardTitle>
              <CardDescription>基于雅思写作评分标准</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">6.5</div>
                    <div className="text-sm text-muted-foreground">TR</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">6.0</div>
                    <div className="text-sm text-muted-foreground">CC</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">6.5</div>
                    <div className="text-sm text-muted-foreground">LR</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">6.0</div>
                    <div className="text-sm text-muted-foreground">GRA</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">总体评分: 6.5</h4>
                  <div className="space-y-2 text-sm">
                    <p><Badge variant="secondary">TR</Badge> 任务回应较好，但部分论点需要更多支持</p>
                    <p><Badge variant="secondary">CC</Badge> 逻辑连贯，但段落之间过渡可以更自然</p>
                    <p><Badge variant="secondary">LR</Badge> 词汇使用恰当，可以尝试更多高级词汇</p>
                    <p><Badge variant="secondary">GRA</Badge> 语法准确性良好，注意复杂句的使用</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
