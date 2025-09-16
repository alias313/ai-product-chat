import { Effect, Config, Redacted } from "effect";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { PROMPTS } from "@/lib/prompts";
import { GenerateImageRequest } from "@/lib/types";

import { JsonError, GenerateImageError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const mainEffect = Effect.gen(function* () {
    const apiKeyRedacted = yield* Config.redacted("GOOGLE_GENERATIVE_AI_API_KEY");

    const { imagePrompt }: GenerateImageRequest = yield* Effect.tryPromise({
      try: () => req.json(),
      catch: () => new JsonError({ customMessage: "Error parsing request body" })
    })

    const googleClient = createGoogleGenerativeAI({ apiKey: Redacted.value(apiKeyRedacted) });

    const prompt = PROMPTS.GENERATE_IMAGE(imagePrompt);
    const { files } = yield* Effect.tryPromise({
      try: () => generateText({
        model: googleClient("gemini-2.5-flash-image-preview"),
        prompt,
        providerOptions: {
            google: {
                responseModalities: ["IMAGE"]
            }
        }
      }),
      catch: (error) => new GenerateImageError({ customMessage: `Error generating image ${error}` })
    });

    const response = yield* Effect.try({
      try: () => NextResponse.json({
        image: files[0] || null,
      }, { status: 200 }),
      catch: () => new JsonError({ customMessage: "Error parsing generated text" })
    });

    return response;
  }).pipe(
    Effect.catchTags({
      GenerateImageError: (error: GenerateImageError) =>
        Effect.logError(error.customMessage).pipe(
            Effect.as(
            NextResponse.json({ error: error.customMessage }, { status: 500 })
            )
        ),
      JsonError: (error: JsonError) => Effect.logError(error.customMessage).pipe(
        Effect.as(
          NextResponse.json({ error: error.customMessage }, { status: 500 })
        )
      ),
    })
  )

  return Effect.runPromise(mainEffect);
}
