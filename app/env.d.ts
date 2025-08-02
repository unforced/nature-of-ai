declare namespace NodeJS {
  interface ProcessEnv {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;

    // AI Providers
    OPENAI_API_KEY?: string;
    ANTHROPIC_API_KEY?: string;
    GROQ_API_KEY?: string;
    COHERE_API_KEY?: string;
    HUGGINGFACE_API_KEY?: string;
    PERPLEXITY_API_KEY?: string;

    // Local AI
    OLLAMA_BASE_URL?: string;
    LOCALAI_BASE_URL?: string;

    // Application
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_APP_NAME: string;

    // Feature Flags
    NEXT_PUBLIC_ENABLE_AUTH: string;
    NEXT_PUBLIC_ENABLE_ANALYTICS: string;
    NEXT_PUBLIC_ENABLE_COMMUNITY_FEATURES: string;

    // Rate Limiting
    RATE_LIMIT_REQUESTS_PER_MINUTE: string;
    RATE_LIMIT_TOKENS_PER_DAY: string;

    // Monitoring
    SENTRY_DSN?: string;
    POSTHOG_API_KEY?: string;
    POSTHOG_HOST?: string;
  }
}