import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Headphones, PenTool, MessageSquare, TrendingUp, Target } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">学习仪表盘</h1>
        <p className="text-muted-foreground">追踪你的学习进度和成绩</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已学单词</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">总计 3500 词</p>
            <Progress value={9.8} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">听力练习</CardTitle>
            <Headphones className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">已完成套数</p>
            <Progress value={30} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">阅读练习</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">已完成套数</p>
            <Progress value={20} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">写作练习</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">已完成篇数</p>
            <Progress value={25} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              成绩趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              成绩趋势图表（待实现）
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              今日任务
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>背单词 50 个</span>
                <span className="text-sm text-muted-foreground">已完成 30/50</span>
              </div>
              <Progress value={60} />
              <div className="flex items-center justify-between">
                <span>听力练习 1 套</span>
                <span className="text-sm text-muted-foreground">未完成</span>
              </div>
              <Progress value={0} />
              <div className="flex items-center justify-between">
                <span>阅读练习 1 套</span>
                <span className="text-sm text-muted-foreground">未完成</span>
              </div>
              <Progress value={0} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">完成词汇学习</p>
                <p className="text-sm text-muted-foreground">学习了 30 个新单词</p>
              </div>
              <span className="text-sm text-muted-foreground">2 小时前</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">完成听力练习</p>
                <p className="text-sm text-muted-foreground">Cambridge 18 Test 1 - 7.0 分</p>
              </div>
              <span className="text-sm text-muted-foreground">昨天</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <PenTool className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">完成写作练习</p>
                <p className="text-sm text-muted-foreground">Task 2 - AI 评分 6.5</p>
              </div>
              <span className="text-sm text-muted-foreground">2 天前</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
