import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { ApiKeyMissingError, getOpenAIForUser, chatCompletion, parseJsonResponse } from "@/lib/openai"

interface FeedbackBody {
  part: "part1" | "part2" | "part3"
  topic: string
  transcript: { role: "examiner" | "candidate"; content: string }[]
}

export interface SpeakingFeedback {
  scores: {
    fluencyCoherence: { score: number; feedback: string }
    lexicalResource: { score: number; feedback: string }
    grammaticalRange: { score: number; feedback: string }
    pronunciation: { score: number; feedback: string }
  }
  overallScore: number
  strengths: string[]
  improvements: string[]
  sampleAnswer: string
}

function buildTranscript(transcript: FeedbackBody["transcript"]): string {
  return transcript
    .map((m) => `${m.role === "examiner" ? "考官" : "考生"}: ${m.content}`)
    .join("\n")
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const body = await request.json().catch(() => null) as FeedbackBody | null
    if (!body || !body.topic || !Array.isArray(body.transcript) || body.transcript.length === 0) {
      return NextResponse.json({ error: "请先完成对话再获取反馈" }, { status: 400 })
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
          content: "你是严谨的雅思口语考官，严格输出符合要求的 JSON。",
        },
        {
          role: "user",
          content: `
你是一位雅思口语考官，请根据考生在 Part ${body.part.toUpperCase()} 对话中的表现评分。
当前话题: ${body.topic}

完整对话:
${buildTranscript(body.transcript)}

请按雅思口语官方标准，严格用以下 JSON 格式返回（不要添加额外文字）:
{
  "scores": {
    "fluencyCoherence": { "score": 0-9, "feedback": "中文点评" },
    "lexicalResource": { "score": 0-9, "feedback": "中文点评" },
    "grammaticalRange": { "score": 0-9, "feedback": "中文点评" },
    "pronunciation": { "score": 0-9, "feedback": "中文点评" }
  },
  "overallScore": 0-9,
  "strengths": ["中文优点"],
  "improvements": ["中文改进建议"],
  "sampleAnswer": "英文参考答案"
}
`.trim(),
        },
      ],
      { temperature: 0.4, maxTokens: 2000 }
    )

    const feedback = await parseJsonResponse<SpeakingFeedback>(content)
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Speaking feedback error:", error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "AI 返回解析失败，请重试" }, { status: 502 })
    }
    return NextResponse.json({ error: "反馈生成失败，请稍后重试" }, { status: 500 })
  }
}
