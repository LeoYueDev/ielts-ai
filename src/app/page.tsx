import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Headphones, PenTool, MessageSquare, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          AI 驱动的雅思备考平台
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          覆盖听说读写四项，全部功能免费开放。配置自己的 API Key，即可使用 AI 批改和陪练功能。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/vocabulary">
            <Button size="lg">
              开始学习
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" size="lg">
              配置 API Key
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 mb-2" />
              <CardTitle>词汇</CardTitle>
              <CardDescription>
                雅思核心词汇，多种练习模式，AI 生成例句和记忆法
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 3000-4000 核心词汇</li>
                <li>• 卡片、选择、打字、匹配练习</li>
                <li>• 艾宾浩斯遗忘曲线复习</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Headphones className="h-10 w-10 mb-2" />
              <CardTitle>听力</CardTitle>
              <CardDescription>
                剑桥真题模拟，自动评分，AI 错题分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Cambridge 4-18 真题</li>
                <li>• 计时模拟考试</li>
                <li>• AI 错题解析</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 mb-2" />
              <CardTitle>阅读</CardTitle>
              <CardDescription>
                真题练习，AI 精读解析，词汇标注
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 真题计时练习</li>
                <li>• 长难句分析</li>
                <li>• 同义词替换标注</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <PenTool className="h-10 w-10 mb-2" />
              <CardTitle>写作</CardTitle>
              <CardDescription>
                AI 批改作文，四项评分，逐段反馈
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Task 1 & Task 2 题目库</li>
                <li>• AI 四项评分 (TR/CC/LR/GRA)</li>
                <li>• 语法错误标注和改进建议</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 mb-2" />
              <CardTitle>口语</CardTitle>
              <CardDescription>
                AI 模拟考官对话，实时评分反馈
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Part 1/2/3 完整题库</li>
                <li>• AI 模拟真实考试</li>
                <li>• 四项评分 (FC/LR/GRA/P)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 mb-2" />
              <CardTitle>学习追踪</CardTitle>
              <CardDescription>
                进度追踪，成绩趋势，错题本
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 每日打卡记录</li>
                <li>• 成绩趋势图</li>
                <li>• 错题收藏和复习</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-6">完全免费</h2>
        <p className="text-xl text-muted-foreground mb-8">
          所有基础功能完全免费。AI 功能需要配置自己的 OpenAI API Key，费用透明。
        </p>
        <Link href="/vocabulary">
          <Button size="lg">
            立即开始
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
