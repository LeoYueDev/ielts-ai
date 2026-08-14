import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { ApiKeyMissingError, getOpenAIForUser, chatCompletion, parseJsonResponse } from "@/lib/openai"

interface FeedbackBody {
  taskType: "task1" | "task2"
  topic?: string
  essay: string
}

export interface WritingFeedback {
  scores: {
    taskResponse: { score: number; feedback: string }
    coherenceCohesion: { score: number; feedback: string }
    lexicalResource: { score: number; feedback: string }
    grammaticalRange: { score: number; feedback: string }
  }
  overallScore: number
  paragraphFeedback: { paragraph: string; feedback: string; suggestions: string[] }[]
  grammarErrors: { original: string; correction: string; explanation: string }[]
  improvements: string[]
  sampleAnswer?: string
}

function buildPrompt({ taskType, topic, essay }: Required<FeedbackBody>): string {
  return `
你是一位资深的雅思写作考官，请按照雅思官方评分标准批改以下作文。

作文类型: ${taskType === "task1" ? "Task 1（图表小作文）" : "Task 2（议论文）"}
题目: ${topic}
用户作文:
${essay}

请严格按以下 JSON 格式返回（不要包含任何额外文字）:
{
  "scores": {
    "taskResponse": { "score": 0-9, "feedback": "中文点评" },
    "coherenceCohesion": { "score": 0-9, "feedback": "中文点评" },
    "lexicalResource": { "score": 0-9, "feedback": "中文点评" },
    "grammaticalRange": { "score": 0-9, "feedback": "中文点评" }
  },
  "overallScore": 0-9,
  "paragraphFeedback": [
    { "paragraph": "段落原文片段", "feedback": "中文评价", "suggestions": ["改进建议"] }
  ],
  "grammarErrors": [
    { "original": "错误原文", "correction": "正确写法", "explanation": "中文解释" }
  ],
  "improvements": ["中文改进建议"],
  "sampleAnswer": "一篇优秀的范文"
}
`.trim()
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const body = await request.json().catch(() => null) as FeedbackBody | null
    if (!body) {
      return NextResponse.json({ error: "请求格式错误" }, { status: 400 })
    }

    const taskType = body.taskType === "task1" ? "task1" : "task2"
    const essay = body.essay?.trim()
    if (!essay || essay.length < 50) {
      return NextResponse.json(
        { error: "作文内容太短，请至少输入一篇完整的作文" },
        { status: 400 }
      )
    }

    let client
    try {
      client = await getOpenAIForUser(session.sub)
    } catch (error) {
      if (error instanceof ApiKeyMissingError) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      throw error
    }

    const content = await chatCompletion(
      client,
      [
        {
          role: "system",
          content: "你是严谨、专业的雅思写作考官，输出严格符合要求的 JSON。",
        },
        {
          role: "user",
          content: buildPrompt({
            taskType,
            topic: body.topic || "（未提供题目）",
            essay,
          }),
        },
      ],
      { temperature: 0.4, maxTokens: 2500 }
    )

    const feedback = await parseJsonResponse<WritingFeedback>(content)
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("AI feedback error:", error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "AI 返回解析失败，请重试" }, { status: 502 })
    }
    return NextResponse.json({ error: "AI 批改失败，请稍后重试" }, { status: 500 })
  }
}
