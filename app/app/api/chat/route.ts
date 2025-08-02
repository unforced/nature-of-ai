import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, context } = await req.json();

  const systemPrompt = `You are an expert tutor for creative coding and The Nature of Code. 
You help students understand programming concepts, debug their code, and explore creative coding ideas.
You have deep knowledge of p5.js, Processing, physics simulations, and generative art.

${context ? `Current context:\n${context}` : ''}`;

  const result = await streamText({
    model: openai('gpt-4'),
    system: systemPrompt,
    messages,
  });

  return result.toAIStreamResponse();
}