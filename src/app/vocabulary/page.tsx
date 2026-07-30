"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Volume2, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

const mockWords = [
  { word: "abandon", phonetic: "/əˈbændən/", meaning: "v. 放弃，抛弃", example: "He abandoned his wife and children.", category: "核心词汇" },
  { word: "ability", phonetic: "/əˈbɪləti/", meaning: "n. 能力，才能", example: "She has the ability to solve complex problems.", category: "核心词汇" },
  { word: "abroad", phonetic: "/əˈbrɔːd/", meaning: "adv. 在国外", example: "He went abroad to study.", category: "核心词汇" },
  { word: "absolute", phonetic: "/ˈæbsəluːt/", meaning: "adj. 绝对的", example: "There is no absolute truth.", category: "核心词汇" },
  { word: "absorb", phonetic: "/əbˈzɔːrb/", meaning: "v. 吸收", example: "Plants absorb water from the soil.", category: "核心词汇" },
]

export default function VocabularyPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const currentWord = mockWords[currentIndex]

  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % mockWords.length)
    setIsFlipped(false)
  }

  const prevWord = () => {
    setCurrentIndex((prev) => (prev - 1 + mockWords.length) % mockWords.length)
    setIsFlipped(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">词汇</h1>
        <p className="text-muted-foreground mt-2">雅思核心词汇，多种练习模式</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">已学单词</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">总计 3000 词</p>
            <Progress value={5.2} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">今日学习</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">目标 50 词/天</p>
            <Progress value={46} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">待复习</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">艾宾浩斯复习计划</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              开始复习
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cards">卡片模式</TabsTrigger>
          <TabsTrigger value="choice">选择题</TabsTrigger>
          <TabsTrigger value="typing">打字模式</TabsTrigger>
          <TabsTrigger value="list">词表浏览</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{currentWord.category}</Badge>
                <Button variant="ghost" size="icon">
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-center py-12">
              <div
                className="cursor-pointer select-none"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {!isFlipped ? (
                  <>
                    <h2 className="text-4xl font-bold mb-4">{currentWord.word}</h2>
                    <p className="text-lg text-muted-foreground">{currentWord.phonetic}</p>
                    <p className="text-sm text-muted-foreground mt-8">点击显示释义</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold mb-4">{currentWord.meaning}</h2>
                    <p className="text-lg text-muted-foreground italic">
                      "{currentWord.example}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-8">点击显示单词</p>
                  </>
                )}
              </div>
            </CardContent>
            <div className="flex justify-center gap-4 pb-6">
              <Button variant="outline" onClick={prevWord}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                上一个
              </Button>
              <Button variant="outline" onClick={nextWord}>
                下一个
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="choice">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>选择题模式</CardTitle>
              <p className="text-muted-foreground">选择正确的中文释义</p>
            </CardHeader>
            <CardContent className="text-center py-8">
              <h2 className="text-4xl font-bold mb-8">{currentWord.word}</h2>
              <div className="grid gap-4 max-w-md mx-auto">
                <Button variant="outline" className="justify-start h-auto py-4">
                  v. 放弃，抛弃
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  n. 能力，才能
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  adv. 在国外
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  adj. 绝对的
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typing">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>打字模式</CardTitle>
              <p className="text-muted-foreground">根据释义拼写单词</p>
            </CardHeader>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold mb-2">v. 放弃，抛弃</h2>
              <p className="text-muted-foreground mb-8">{currentWord.phonetic}</p>
              <input
                type="text"
                className="w-full max-w-md mx-auto px-4 py-3 text-center text-lg border rounded-md"
                placeholder="输入单词..."
              />
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  重试
                </Button>
                <Button>提交答案</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>词表浏览</CardTitle>
              <p className="text-muted-foreground">按词组分类浏览所有单词</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockWords.map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{word.word}</div>
                        <div className="text-sm text-muted-foreground">
                          {word.phonetic}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{word.meaning}</div>
                      <Badge variant="secondary" className="mt-1">
                        {word.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
