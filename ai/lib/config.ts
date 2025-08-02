export interface AIConfig {
  provider: 'openai' | 'anthropic' | 'groq' | 'ollama' | 'cohere';
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export const defaultConfig: AIConfig = {
  provider: 'openai',
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  systemPrompt: `You are an expert tutor for creative coding and The Nature of Code. 
You help students understand programming concepts, debug their code, and explore creative coding ideas.
You have deep knowledge of p5.js, Processing, physics simulations, and generative art.`,
};

export const modelDefaults: Record<string, { model: string }> = {
  openai: { model: 'gpt-4' },
  anthropic: { model: 'claude-3-opus-20240229' },
  groq: { model: 'mixtral-8x7b-32768' },
  ollama: { model: 'llama2' },
  cohere: { model: 'command' },
};