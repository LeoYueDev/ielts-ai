"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, SkipForward, Volume2 } from "lucide-react"

const mockQuestions = [
  { id: 1, question: "What is the main topic of the conversation?", options: ["A. Travel plans", "B. Weather forecast", "C. Job interview", "D. School project"], correct: 0 },
  { id: 2, question: "Where does the woman want to go?", options: ["A. London", "B. Paris", "C. Berlin", "D. Rome"], correct: 1 },
  { id: 3, question: "What time does the train leave?", options: ["A. 9:00 AM", "B. 10:30 AM", "C. 2:15 PM", "D. 4:45 PM"], correct: 2 },
]

export default function ListeningPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const question = mockQuestions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">听力</h1>
        <p className="text-muted-foreground mt-2">剑桥真题模拟，AI 错题分析</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">已完成测试</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Cambridge 4-18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">平均正确率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <Progress value={72} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">错题数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              查看错题本
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cambridge 14 - Test 1</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Section 1: Questions 1-10
              </p>
            </div>
            <Badge>进行中</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-sm font-medium">音频播放</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <Progress value={45} className="w-32" />
                <span className="text-sm text-muted-foreground">2:15 / 5:00</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                问题 {currentQuestion + 1} / {mockQuestions.length}
              </h3>
              <Badge variant="secondary">
                {currentQuestion + 1} / {mockQuestions.length}
              </Badge>
            </div>

            <p className="text-lg">{question.question}</p>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full justify-start h-auto py-4"
                  onClick={() => setSelectedAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                上一题
              </Button>
              <Button
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(mockQuestions.length - 1, currentQuestion + 1)
                  )
                }
                disabled={currentQuestion === mockQuestions.length - 1}
              >
                下一题
                <SkipForward className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
