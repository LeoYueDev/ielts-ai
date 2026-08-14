import "server-only"

import OpenAI from "openai"
import { prisma } from "@/lib/db"
import { decryptSecret } from "@/lib/crypto"

export class ApiKeyMissingError extends Error {
  constructor() {
    super("未配置 OpenAI API Key，请在设置中配置")
    this.name = "ApiKeyMissingError"
  }
}

export async function getOpenAIForUser(userId: string): Promise<OpenAI> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { openaiApiKeyEncrypted: true },
  })

  const encrypted = user?.openaiApiKeyEncrypted
  if (!encrypted) throw new ApiKeyMissingError()

  const apiKey = await decryptSecret(encrypted)
  if (!apiKey) throw new ApiKeyMissingError()

  return new OpenAI({ apiKey })
}

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export async function chatCompletion(
  client: OpenAI,
  messages: ChatMessage[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 2000,
  })

  return completion.choices[0]?.message?.content ?? ""
}

export async function parseJsonResponse<T>(content: string): Promise<T> {
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim()
  return JSON.parse(cleaned) as T
}
