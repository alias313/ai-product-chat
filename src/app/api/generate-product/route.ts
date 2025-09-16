import { Effect, Config, Redacted } from "effect";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { CHAT_CONFIG } from "@/lib/consts";
import { PROMPTS } from "@/lib/prompts";
import { GenerateProductRequest } from "@/lib/types";

import { JsonError, GenerateTextError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const mainEffect = Effect.gen(function* () {
    const apiKeyRedacted = yield* Config.redacted("GOOGLE_GENERATIVE_AI_API_KEY");

    const { userMessage, conversationHistory, isStart }: GenerateProductRequest = yield* Effect.tryPromise({
      try: () => req.json(),
      catch: () => new JsonError({ customMessage: "Error parsing request body" })
    })

    let prompt: string = PROMPTS.INITIAL_PROMPT;

    if (!isStart) {
      const conversationText = conversationHistory.map(
        (message) => `${message.role}: ${message.content}`
      ).join("\n");

      prompt = PROMPTS.CONTINUOUS_PROMPT(conversationText, userMessage);
    }
    const googleClient = createGoogleGenerativeAI({ apiKey: Redacted.value(apiKeyRedacted) });

    const { text } = yield* Effect.tryPromise({
      try: () => generateText({
        model: googleClient("gemini-2.5-flash"),
        prompt,
      }),
      catch: () => new GenerateTextError({ customMessage: "Error generating text" })
    });

    const [product, imagePrompt] = text.split(CHAT_CONFIG.IMAGE.SEPARATOR); 

    const response = yield* Effect.try({
      try: () => NextResponse.json({
        product,
        imagePrompt,
      }, { status: 200 }),
      catch: () => new JsonError({ customMessage: "Error parsing generated text" })
    });

    return response;
  }).pipe(
    Effect.catchTags({
      GenerateTextError: (error: GenerateTextError) => Effect.logError(error.customMessage),
      JsonError: (error: JsonError) => Effect.logError(error.customMessage),
    })
  )

  return Effect.runPromise(mainEffect);
}
