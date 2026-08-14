import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { ApiKeyMissingError, getOpenAIForUser, chatCompletion, type ChatMessage } from "@/lib/openai"

interface AiResponseBody {
  part: "part1" | "part2" | "part3"
  topic: string
  transcript: { role: "examiner" | "candidate"; content: string }[]
}

const PART_LABEL: Record<AiResponseBody["part"], string> = {
  part1: "Part 1（简短问答）",
  part2: "Part 2（个人陈述 2 分钟）",
  part3: "Part 3（深入讨论）",
}

function buildPrompt({ part, topic, transcript }: AiResponseBody): string {
  const history = transcript
    .map((m) => `${m.role === "examiner" ? "考官" : "考生"}: ${m.content}`)
    .join("\n")

  return `
你是一位雅思口语考官，正在主持 ${PART_LABEL[part]} 的考试。
当前话题: ${topic}

对话记录:
${history || "（还没开始，请先提出第一个问题）"}

请扮演考官，根据考试流程提出下一个问题或适当的回应，保持自然。
${part === "part2" ? "如果是 Part 2，请按流程给出话题卡片并邀请考生开始陈述。" : ""}

只返回你的考官话语，不要加任何前缀或解释。
`.trim()
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const body = await request.json().catch(() => null) as AiResponseBody | null
    if (!body || !body.topic || !Array.isArray(body.transcript)) {
      return NextResponse.json({ error: "请求格式错误" }, { status: 400 })
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

    const messages: ChatMessage[] = [
      { role: "system", content: "你是专业、自然的雅思口语考官，全程用英文交流。" },
      { role: "user", content: buildPrompt(body) },
    ]

    const reply = await chatCompletion(client, messages, { temperature: 0.8, maxTokens: 300 })

    return NextResponse.json({ reply: reply.trim() })
  } catch (error) {
    console.error("Speaking AI error:", error)
    return NextResponse.json({ error: "AI 回应失败，请稍后重试" }, { status: 500 })
  }
}
