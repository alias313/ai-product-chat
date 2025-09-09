import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { CHAT_CONFIG } from "@/lib/consts";
import { PROMPTS } from "@/lib/prompts";
import { GenerateProductRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
    try {
        const { userMessage, conversationHistory, isStart }: GenerateProductRequest = await req.json();
    
        let prompt: string = PROMPTS.INITIAL_PROMPT;

        if (!isStart) {
            const conversationText = conversationHistory.map(
                (message) => `${message.role}: ${message.content}`
            ).join("\n");

            prompt = PROMPTS.CONTINUOUS_PROMPT(conversationText, userMessage);
        }

        const { text } = await generateText({
            model: google("gemini-2.5-flash"),
            prompt,
        });

        console.log("Generated text", text);

        return NextResponse.json({
            product: text,
        }, { status: 200 });
    } catch (error) {
        console.error("Error generating product", error);
        return NextResponse.json({ "Error generating product" }, { status: 500})
    }

}
