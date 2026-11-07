
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { ASK_SYSTEM_PROMPT } from "@/lib/ask/systemPrompt";

export const runtime = "nodejs";

const GROQ_MODEL = "openai/gpt-oss-20b";
const OPENROUTER_MODEL = "openrouter/free";
const GEMINI_MODEL = "gemini-3.8-flash";

const groq = process.env.GROQ_API_KEY
    ? new Groq({
        apiKey: process.env.GROQ_API_KEY,
        timeout: 20000,
        maxRetries: 0,
    })
    : null;

const gemini = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    })
    : null;

const SYSTEM_PROMPT = `
You are ARYA, Hritik Raj Arya's personal and universal AI assistant.

PERSONAL KNOWLEDGE:
The following information is verified portfolio information about Hritik.

${ASK_SYSTEM_PROMPT}

ANSWERING RULES:

1. When asked about Hritik:
   - Use the personal knowledge above.
   - Answer in third person.
   - Never invent projects, achievements or experience.
   - If information is missing, clearly say so.

2. When asked general questions:
   - Answer using your general knowledge.
   - Do not restrict yourself to Hritik's portfolio.

3. When asked about current events:
   - Do not pretend your training knowledge is live.
   - Use web search when available.
   - Clearly mention when current information cannot be verified.

4. Keep answers concise, structured and conversational.
5. Use Markdown formatting.
6. Respond in the user's language.
`;

type ChatRole = "user" | "assistant";

type ChatMessage = {
    role: ChatRole;
    content: string;
};

type Provider = {
    name: string;
    stream: () => AsyncGenerator<string>;
};

class ProviderError extends Error {
    constructor(
        message: string,
        public status?: number
    ) {
        super(message);
        this.name = "ProviderError";
    }
}

function getErrorStatus(error: unknown): number | undefined {
    if (
        typeof error !== "object" ||
        error === null
    ) {
        return undefined;
    }

    const value =
        "status" in error
            ? error.status
            : "code" in error
                ? error.code
                : undefined;

    const status =
        typeof value === "number"
            ? value
            : typeof value === "string"
                ? Number(value)
                : undefined;

    return Number.isFinite(status) ? status : undefined;
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error
        ? error.message
        : "Unknown provider error";
}

// ---------------------------------------------
// GROQ STREAM
// ---------------------------------------------

async function* groqStream(
    messages: Array<{
        role: "system" | "user" | "assistant";
        content: string;
    }>
): AsyncGenerator<string> {
    if (!groq) {
        throw new ProviderError("Groq API key is missing.");
    }

    const result = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages,
        stream: true,
        max_completion_tokens: 700,
    });

    for await (const chunk of result) {
        const content = chunk.choices[0]?.delta?.content;

        if (typeof content === "string" && content) {
            yield content;
        }
    }
}

// ---------------------------------------------
// OPENROUTER STREAM
// ---------------------------------------------

async function* openRouterStream(
    messages: Array<{
        role: "system" | "user" | "assistant";
        content: string;
    }>
): AsyncGenerator<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new ProviderError(
            "OpenRouter API key is missing."
        );
    }

    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "ARYA AI Assistant",
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages,
                stream: true,
                max_tokens: 700,
            }),
            signal: AbortSignal.timeout(20000),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new ProviderError(
            `OpenRouter error: ${errorText}`,
            response.status
        );
    }

    if (!response.body) {
        throw new ProviderError(
            "OpenRouter returned an empty response."
        );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    try {
        while (true) {
            const { done, value } = await reader.read();

            buffer += decoder.decode(value, {
                stream: !done,
            });

            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const rawLine of lines) {
                const line = rawLine.trim();

                if (!line.startsWith("data:")) {
                    continue;
                }

                const payload = line.slice(5).trim();

                if (payload === "[DONE]") {
                    return;
                }

                try {
                    const data = JSON.parse(payload);

                    const content =
                        data.choices?.[0]?.delta?.content;

                    if (
                        typeof content === "string" &&
                        content.length > 0
                    ) {
                        yield content;
                    }
                } catch {
                    // Ignore incomplete or non-JSON SSE events.
                }
            }

            if (done) break;
        }
    } finally {
        reader.releaseLock();
    }
}

// ---------------------------------------------
// GEMINI STREAM
// ---------------------------------------------

async function* geminiStream(
    messages: ChatMessage[]
): AsyncGenerator<string> {
    if (!gemini) {
        throw new ProviderError(
            "Gemini API key is missing."
        );
    }

    const contents = messages.map((message) => ({
        role: message.role === "assistant" ? "model" as const : "user" as const,
        parts: [{ text: message.content }],
    }));

    const result = await gemini.models.generateContentStream({
        model: GEMINI_MODEL,
        contents,
        config: {
            systemInstruction: SYSTEM_PROMPT,
            maxOutputTokens: 700,
        },
    });

    for await (const chunk of result) {
        const content = chunk.text;

        if (content) {
            yield content;
        }
    }
}

// ---------------------------------------------
// API ROUTE
// ---------------------------------------------

export async function POST(request: Request) {
    const startedAt = Date.now();

    try {
        const body = await request.json();

        const rawMessages = Array.isArray(body?.messages)
            ? body.messages
            : [];

        const messages: ChatMessage[] = rawMessages
            .filter(
                (message: {
                    role?: string;
                    content?: string;
                }) =>
                    ["user", "assistant"].includes(
                        message.role ?? ""
                    ) &&
                    typeof message.content === "string" &&
                    message.content.trim().length > 0
            )
            .slice(-10)
            .map((message: {
                role: string;
                content: string;
            }) => ({
                role: message.role as ChatRole,
                content: message.content.trim(),
            }));

        if (messages.length === 0) {
            return NextResponse.json(
                { error: "No valid messages provided." },
                { status: 400 }
            );
        }

        const providerMessages = [
            {
                role: "system" as const,
                content: SYSTEM_PROMPT,
            },
            ...messages.map((message) => ({
                role: message.role,
                content: message.content,
            })),
        ];

        const providers: Provider[] = [];

        if (groq) {
            providers.push({
                name: "Groq",
                stream: () => groqStream(providerMessages),
            });
        }

        if (process.env.OPENROUTER_API_KEY) {
            providers.push({
                name: "OpenRouter",
                stream: () => openRouterStream(providerMessages),
            });
        }

        if (gemini) {
            providers.push({
                name: "Gemini",
                stream: () => geminiStream(messages),
            });
        }

        if (providers.length === 0) {
            return NextResponse.json(
                {
                    error: "No AI provider is configured. Add at least one API key to .env.local.",
                },
                { status: 500 }
            );
        }

        // -------------------------------------
        // PROVIDER ROUTING
        // Try providers until the first token.
        // -------------------------------------

        let selectedProvider = "";
        let selectedIterator: AsyncGenerator<string> | null = null;
        let firstChunk = "";
        let lastError: unknown;

        for (const provider of providers) {
            const providerStartedAt = Date.now();

            try {
                console.info(
                    `[ARYA] Trying provider: ${provider.name}`
                );

                const iterator = provider.stream();

                const first = await iterator.next();

                if (first.done || !first.value) {
                    throw new ProviderError(
                        `${provider.name} returned an empty response.`
                    );
                }

                selectedProvider = provider.name;
                selectedIterator = iterator;
                firstChunk = first.value;

                console.info(
                    `[ARYA] ${provider.name} first token: ${Date.now() - providerStartedAt
                    }ms`
                );

                break;

            } catch (error) {
                lastError = error;

                console.error(
                    `[ARYA] ${provider.name} failed:`,
                    getErrorMessage(error),
                    "Status:",
                    getErrorStatus(error)
                );
            }
        }

        if (!selectedIterator) {
            console.error(
                "[ARYA] All providers failed:",
                getErrorMessage(lastError)
            );

            return NextResponse.json(
                {
                    error: "All AI providers are currently unavailable. Please try again shortly.",
                    retryable: true,
                },
                { status: 503 }
            );
        }

        // -------------------------------------
        // STREAM TO CHAT INTERFACE
        // -------------------------------------

        const encoder = new TextEncoder();

        const responseStream = new ReadableStream<Uint8Array>({
            async start(controller) {
                let totalCharacters = firstChunk.length;

                try {
                    controller.enqueue(
                        encoder.encode(firstChunk)
                    );

                    while (true) {
                        const { done, value } =
                            await selectedIterator!.next();

                        if (done) break;

                        if (!value) continue;

                        totalCharacters += value.length;

                        controller.enqueue(
                            encoder.encode(value)
                        );
                    }

                    console.info(
                        `[ARYA] Completed | Provider: ${selectedProvider} | Total: ${Date.now() - startedAt
                        }ms | Characters: ${totalCharacters}`
                    );

                    controller.close();

                } catch (error) {
                    console.error(
                        `[ARYA] ${selectedProvider} stream interrupted:`,
                        getErrorMessage(error)
                    );

                    controller.enqueue(
                        encoder.encode(
                            "\n\n*Response interrupted. Please try again.*"
                        )
                    );

                    controller.close();
                }
            },

            cancel() {
                console.info(
                    `[ARYA] Client disconnected from ${selectedProvider}`
                );
            },
        });

        return new Response(responseStream, {
            status: 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
                "X-Content-Type-Options": "nosniff",
                "X-Accel-Buffering": "no",
            },
        });

    } catch (error) {
        console.error("[ARYA] API error:", error);

        return NextResponse.json(
            {
                error: "ARYA could not process the request.",
            },
            { status: 500 }
        );
    }
}














// import { GoogleGenAI } from "@google/genai";
// import { NextResponse } from "next/server";

// export const runtime = "nodejs";

// const apiKey = process.env.GEMINI_API_KEY;
// const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// const MODEL = "gemini-3.8-flash";

// const SYSTEM_PROMPT = `
// You are ARYA, Hritik Raj Arya's AI agent.

// You are a universal AI assistant with two knowledge areas.

// 1. Hritik-specific knowledge:
//    - Projects and portfolio
//    - Technical skills and technology stack
//    - Professional experience
//    - Public GitHub information
//    - Professional background

// 2. General and world knowledge:
//    - Programming and software engineering
//    - AI and machine learning
//    - Technology and science
//    - Current events and research
//    - General knowledge

// INSTRUCTIONS:
// - Answer general questions using your knowledge.
// - Never invent Hritik's projects, experience, skills or achievements.
// - Distinguish verified information about Hritik from general knowledge.
// - Be helpful, conversational and technically accurate.
// - Use examples when explaining technical concepts.
// - If you don't know something, say so honestly.
// - Respond in the language used by the user.
// - Prefer concise answers unless more detail is requested.
// - Format answers using Markdown.
// `;

// export async function POST(request: Request) {
//     const requestStarted = Date.now();

//     try {
//         if (!ai) {
//             return NextResponse.json(
//                 { error: "GEMINI_API_KEY is not configured." },
//                 { status: 500 }
//             );
//         }

//         const body = await request.json();

//         const messages = Array.isArray(body.messages)
//             ? body.messages
//             : [];

//         if (messages.length === 0) {
//             return NextResponse.json(
//                 { error: "No messages provided." },
//                 { status: 400 }
//             );
//         }

//         // Retain only the latest 10 messages.
//         const recentMessages = messages.slice(-10);

//         const contents = recentMessages
//             .filter(
//                 (message: { role?: string; content?: string }) =>
//                     ["user", "assistant"].includes(message.role ?? "") &&
//                     typeof message.content === "string" &&
//                     message.content.trim().length > 0
//             )
//             .map(
//                 (message: { role: string; content: string }) => ({
//                     role: message.role === "assistant" ? "model" : "user",
//                     parts: [{ text: message.content }],
//                 })
//             );

//         if (contents.length === 0) {
//             return NextResponse.json(
//                 { error: "No valid messages provided." },
//                 { status: 400 }
//             );
//         }

//         const encoder = new TextEncoder();

//         const stream = new ReadableStream({
//             async start(controller) {
//                 let firstTokenReceived = false;

//                 try {
//                     const result = await ai.models.generateContentStream({
//                         model: MODEL,
//                         contents,
//                         config: {
//                             systemInstruction: SYSTEM_PROMPT,
//                             // thinkingConfig: {
//                             //     thinkingLevel: "LOW",
//                             // },
//                             maxOutputTokens: 700,
//                         },
//                     });

//                     for await (const chunk of result) {
//                         const text = chunk.text;

//                         if (!text) continue;

//                         if (!firstTokenReceived) {
//                             firstTokenReceived = true;

//                             console.info(
//                                 `[ARYA] First token: ${Date.now() - requestStarted}ms`
//                             );
//                         }

//                         controller.enqueue(encoder.encode(text));
//                     }

//                     console.info(
//                         `[ARYA] Total response time: ${Date.now() - requestStarted}ms`
//                     );

//                     controller.close();

//                 } catch (error) {
//                     console.error("[ARYA] Gemini error:", error);

//                     const status =
//                         typeof error === "object" && error !== null &&
//                             "status" in error
//                             ? error.status
//                             : undefined;

//                     let errorMessage =
//                         "ARYA could not complete the response. Please try again.";

//                     if (status === 429) {
//                         errorMessage =
//                             "Gemini API quota exceeded. Please check your API usage limits.";
//                     } else if (status === 503) {
//                         errorMessage =
//                             "Gemini is temporarily overloaded. Please try again shortly.";
//                     }

//                     controller.enqueue(
//                         encoder.encode(`\n\n${errorMessage}`)
//                     );

//                     controller.close();
//                 }
//             },
//         });

//         return new Response(stream, {
//             headers: {
//                 "Content-Type": "text/plain; charset=utf-8",
//                 "Cache-Control": "no-cache, no-transform",
//                 "X-Content-Type-Options": "nosniff",
//                 "X-Accel-Buffering": "no",
//             },
//         });

//     } catch (error) {
//         console.error("[ARYA] API error:", error);

//         return NextResponse.json(
//             { error: "ARYA could not process the request." },
//             { status: 500 }
//         );
//     }
// }



















// import { GoogleGenAI } from "@google/genai";
// import { NextResponse } from "next/server";

// const apiKey = process.env.GEMINI_API_KEY;

// const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// const SYSTEM_PROMPT = `
// You are ARYA, Hritik Raj Arya's AI agent.

// You are a universal AI assistant with two knowledge areas.

// 1. Hritik-specific knowledge:
//    - Projects and portfolio
//    - Technical skills and technology stack
//    - Professional experience
//    - Public GitHub information
//    - Professional background

// 2. General and world knowledge:
//    - Programming and software engineering
//    - AI and machine learning
//    - Technology and science
//    - Current events and research
//    - General knowledge

// INSTRUCTIONS:
// - Answer general questions using your knowledge.
// - Use Google Search for current or time-sensitive information.
// - Never invent Hritik's projects, experience, skills or achievements.
// - Distinguish verified information about Hritik from general knowledge.
// - Be helpful, conversational and technically accurate.
// - Use examples when explaining technical concepts.
// - If you don't know something, say so honestly.
// - Respond in the language used by the user.
// `;

// export async function POST(request: Request) {
//     try {
//         if (!ai) {
//             return NextResponse.json(
//                 { error: "GEMINI_API_KEY is not configured." },
//                 { status: 500 }
//             );
//         }

//         const body = await request.json();

//         const messages = Array.isArray(body.messages)
//             ? body.messages
//             : [];

//         if (messages.length === 0) {
//             return NextResponse.json(
//                 { error: "No messages provided." },
//                 { status: 400 }
//             );
//         }

//         const contents = messages
//             .filter(
//                 (message: { role?: string; content?: string }) =>
//                     ["user", "assistant"].includes(message.role ?? "") &&
//                     typeof message.content === "string" &&
//                     message.content.trim().length > 0
//             )
//             .map(
//                 (message: { role: string; content: string }) => ({
//                     role: message.role === "assistant" ? "model" : "user",
//                     parts: [{ text: message.content }],
//                 })
//             );

//         if (contents.length === 0) {
//             return NextResponse.json(
//                 { error: "No valid messages provided." },
//                 { status: 400 }
//             );
//         }

//         // Generate response with retries for temporary 503 errors.
//         let response;

//         for (let attempt = 0; attempt < 3; attempt++) {
//             try {
//                 response = await ai.models.generateContent({
//                     model: "gemini-3.8-flash",
//                     contents,
//                     config: {
//                         systemInstruction: SYSTEM_PROMPT,
//                     },
//                 });

//                 break;
//             } catch (error) {
//                 const status =
//                     typeof error === "object" && error !== null && "status" in error
//                         ? error.status
//                         : undefined;

//                 // Retry only temporary server overload errors.
//                 if (status !== 503 || attempt === 2) {
//                     throw error;
//                 }

//                 await new Promise(resolve =>
//                     setTimeout(resolve, attempt === 0 ? 1500 : 3000)
//                 );
//             }
//         }

//         if (!response) {
//             throw new Error("Gemini did not return a response.");
//         }

//         return NextResponse.json({
//             text:
//                 response.text ||
//                 "I couldn't generate a response. Please try again.",
//         });

//     } catch (error: unknown) {
//         console.error("ARYA Gemini API error:", error);

//         const status =
//             typeof error === "object" && error !== null
//                 ? "status" in error
//                     ? error.status
//                     : "code" in error
//                         ? error.code
//                         : undefined
//                 : undefined;

//         if (status === 503) {
//             return NextResponse.json(
//                 {
//                     error: "ARYA is temporarily experiencing high demand. Please try again shortly.",
//                     retryable: true,
//                 },
//                 { status: 503 }
//             );
//         }

//         if (status === 429) {
//             return NextResponse.json(
//                 {
//                     error: "Gemini API quota or rate limit exceeded. Please check your Google AI Studio usage limits.",
//                     retryable: false,
//                 },
//                 { status: 429 }
//             );
//         }

//         return NextResponse.json(
//             {
//                 error: "ARYA could not process the request. Please try again.",
//             },
//             { status: 500 }
//         );
//     }
// }
