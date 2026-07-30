"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2 } from "lucide-react"

const mockPassage = `The Amazon rainforest, covering much of South America, is the world's largest tropical rainforest. It spans across nine countries, with Brazil containing the majority (60%), followed by Peru (13%) and Colombia (10%), with smaller amounts in Venezuela, Ecuador, Bolivia, Guyana, Suriname, and French Guiana.

The Amazon represents over half of the planet's remaining rainforests, and comprises the largest and most biodiverse tract of tropical rainforest in the world, with an estimated 390 billion individual trees divided into 16,000 species. The rainforest is home to millions of species of plants, animals, and insects, many of which are found nowhere else on Earth.

However, the Amazon faces significant threats. Deforestation, driven by logging, agriculture, and mining, has led to the loss of approximately 17% of the Amazon rainforest over the past 50 years. This destruction not only threatens biodiversity but also contributes to climate change, as the rainforest acts as a crucial carbon sink, absorbing billions of tons of carbon dioxide each year.`

const mockQuestions = [
  { id: 1, question: "What percentage of the Amazon rainforest is in Brazil?", answer: "60%", type: "fill" },
  { id: 2, question: "How many tree species are estimated to exist in the Amazon?", answer: "16,000", type: "fill" },
  { id: 3, question: "What has caused the loss of 17% of the Amazon rainforest?", answer: "deforestation", type: "fill" },
]

export default function ReadingPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [timeSpent, setTimeSpent] = useState(0)

  const question = mockQuestions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">阅读</h1>
        <p className="text-muted-foreground mt-2">真题练习，AI 精读解析</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">已完成测试</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Cambridge 4-18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">平均正确率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">平均用时</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52 分钟</div>
            <p className="text-xs text-muted-foreground">目标 60 分钟</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>The Amazon Rainforest</CardTitle>
              <Badge variant="secondary">
                <Clock className="mr-2 h-3 w-3" />
                建议用时: 20 分钟
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {mockPassage.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>题目</CardTitle>
            <p className="text-sm text-muted-foreground">
              问题 {currentQuestion + 1} / {mockQuestions.length}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{question.question}</h3>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full px-4 py-3 border rounded-md"
                placeholder="输入答案..."
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                  setUserAnswer("")
                }}
                disabled={currentQuestion === 0}
              >
                上一题
              </Button>
              <Button
                onClick={() => {
                  if (currentQuestion < mockQuestions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1)
                    setUserAnswer("")
                  }
                }}
                disabled={currentQuestion === mockQuestions.length - 1}
              >
                下一题
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">快速导航</h4>
              <div className="grid grid-cols-3 gap-2">
                {mockQuestions.map((q, index) => (
                  <Button
                    key={q.id}
                    variant={currentQuestion === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCurrentQuestion(index)
                      setUserAnswer("")
                    }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
