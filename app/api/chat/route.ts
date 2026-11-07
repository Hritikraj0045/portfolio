
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `
You are ARYA, Hritik Raj Arya's AI agent.

You are a universal AI assistant with two knowledge areas.

1. Hritik-specific knowledge:
   - Projects and portfolio
   - Technical skills and technology stack
   - Professional experience
   - Public GitHub information
   - Professional background

2. General and world knowledge:
   - Programming and software engineering
   - AI and machine learning
   - Technology and science
   - Current events and research
   - General knowledge

INSTRUCTIONS:
- Answer general questions using your knowledge.
- Use Google Search for current or time-sensitive information.
- Never invent Hritik's projects, experience, skills or achievements.
- Distinguish verified information about Hritik from general knowledge.
- Be helpful, conversational and technically accurate.
- Use examples when explaining technical concepts.
- If you don't know something, say so honestly.
- Respond in the language used by the user.
`;

export async function POST(request: Request) {
    try {
        if (!ai) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured." },
                { status: 500 }
            );
        }

        const body = await request.json();

        const messages = Array.isArray(body.messages)
            ? body.messages
            : [];

        if (messages.length === 0) {
            return NextResponse.json(
                { error: "No messages provided." },
                { status: 400 }
            );
        }

        const contents = messages
            .filter(
                (message: { role?: string; content?: string }) =>
                    ["user", "assistant"].includes(message.role ?? "") &&
                    typeof message.content === "string" &&
                    message.content.trim().length > 0
            )
            .map(
                (message: { role: string; content: string }) => ({
                    role: message.role === "assistant" ? "model" : "user",
                    parts: [{ text: message.content }],
                })
            );

        if (contents.length === 0) {
            return NextResponse.json(
                { error: "No valid messages provided." },
                { status: 400 }
            );
        }

        // Generate response with retries for temporary 503 errors.
        let response;

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-3.8-flash",
                    contents,
                    config: {
                        systemInstruction: SYSTEM_PROMPT,
                    },
                });

                break;
            } catch (error) {
                const status =
                    typeof error === "object" && error !== null && "status" in error
                        ? error.status
                        : undefined;

                // Retry only temporary server overload errors.
                if (status !== 503 || attempt === 2) {
                    throw error;
                }

                await new Promise(resolve =>
                    setTimeout(resolve, attempt === 0 ? 1500 : 3000)
                );
            }
        }

        if (!response) {
            throw new Error("Gemini did not return a response.");
        }

        return NextResponse.json({
            text:
                response.text ||
                "I couldn't generate a response. Please try again.",
        });

    } catch (error: unknown) {
        console.error("ARYA Gemini API error:", error);

        const status =
            typeof error === "object" && error !== null
                ? "status" in error
                    ? error.status
                    : "code" in error
                        ? error.code
                        : undefined
                : undefined;

        if (status === 503) {
            return NextResponse.json(
                {
                    error: "ARYA is temporarily experiencing high demand. Please try again shortly.",
                    retryable: true,
                },
                { status: 503 }
            );
        }

        if (status === 429) {
            return NextResponse.json(
                {
                    error: "Gemini API quota or rate limit exceeded. Please check your Google AI Studio usage limits.",
                    retryable: false,
                },
                { status: 429 }
            );
        }

        return NextResponse.json(
            {
                error: "ARYA could not process the request. Please try again.",
            },
            { status: 500 }
        );
    }
}
