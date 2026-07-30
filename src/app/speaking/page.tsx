"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Play, Square, MessageSquare } from "lucide-react"

export default function SpeakingPage() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">口语练习</h1>
        <p className="text-muted-foreground">AI 模拟考官对话，实时评分反馈</p>
      </div>

      <Tabs defaultValue="part1">
        <TabsList>
          <TabsTrigger value="part1">Part 1</TabsTrigger>
          <TabsTrigger value="part2">Part 2</TabsTrigger>
          <TabsTrigger value="part3">Part 3</TabsTrigger>
          <TabsTrigger value="ai">AI 陪练</TabsTrigger>
        </TabsList>
        <TabsContent value="part1" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Part 1 题库</CardTitle>
              <CardDescription>日常话题问答</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Hometown", "Work/Study", "Hobbies", "Weather", "Food"].map((topic) => (
                  <div key={topic} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{topic}</h4>
                      <p className="text-sm text-muted-foreground">3-4 个问题</p>
                    </div>
                    <Button variant="outline">查看详情</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="part2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Part 2 题库</CardTitle>
              <CardDescription>个人陈述话题卡</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Describe a person", "Describe a place", "Describe an object", "Describe an event"].map((topic) => (
                  <div key={topic} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{topic}</h4>
                      <p className="text-sm text-muted-foreground">2 分钟陈述</p>
                    </div>
                    <Button variant="outline">查看详情</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="part3" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Part 3 题库</CardTitle>
              <CardDescription>深度讨论问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Education", "Technology", "Environment", "Society"].map((topic) => (
                  <div key={topic} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{topic}</h4>
                      <p className="text-sm text-muted-foreground">4-5 个讨论问题</p>
                    </div>
                    <Button variant="outline">查看详情</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI 模拟考官</CardTitle>
              <CardDescription>与 AI 进行真实口语考试模拟</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">准备开始 AI 口语模拟</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    配置 API Key 后，可以与 AI 考官进行真实对话练习
                  </p>
                  <Button disabled={!isRecording}>
                    <Play className="mr-2 h-4 w-4" />
                    开始对话
                  </Button>
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? (
                      <>
                        <Square className="mr-2 h-4 w-4" />
                        停止录音
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        开始录音
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
