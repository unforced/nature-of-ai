import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { AIConfig, modelDefaults } from './config';

export function getAIProvider(config: AIConfig) {
  const model = config.model || modelDefaults[config.provider].model;

  switch (config.provider) {
    case 'openai':
      return openai(model);
    
    case 'anthropic':
      return anthropic(model);
    
    case 'groq':
      const groq = createOpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
      });
      return groq(model);
    
    case 'ollama':
      const ollama = createOpenAI({
        apiKey: 'ollama',
        baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
      });
      return ollama(model);
    
    case 'cohere':
      throw new Error('Cohere provider not yet implemented');
    
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}