# Nature of AI - AI-Augmented Nature of Code Learning Platform

An interactive, AI-powered version of *The Nature of Code* by Daniel Shiffman that embeds the original book and code examples with AI tutoring, exploration, and debugging capabilities.

## 🚀 Features

- **Live Book**: Navigate through all Nature of Code chapters with live, editable code examples
- **AI Chat**: Context-aware AI assistance for explaining concepts, debugging code, and suggesting variations
- **Interactive Playground**: Run and modify p5.js sketches directly in your browser
- **Progress Tracking**: Save your learning progress and build a portfolio of sketches
- **Community Gallery**: Share and remix sketches with other learners

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Git
- A Supabase account (for database and auth)
- API keys for AI providers (OpenAI, Anthropic, etc.)

## 🛠️ Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nature-of-ai.git
cd nature-of-ai
```

2. Initialize and update the Nature of Code submodule:
```bash
git submodule update --init --recursive
```

3. Install dependencies:
```bash
npm install
```

4. Create environment files:
```bash
cp .env.example .env.local
```

5. Configure your environment variables in `.env.local`:
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Providers
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Optional: Additional AI providers
GROQ_API_KEY=your_groq_key
OLLAMA_BASE_URL=http://localhost:11434
```

6. Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
/
├── app/                    # Next.js application
├── nature-of-code-upstream/ # Submodule of official book repo
├── scripts/                # CLI tools for sync and processing
├── ai/                     # AI logic and API routes
├── playground/             # Code editor components
└── infra/                  # Deployment configurations
```

## 🔄 Syncing Upstream Content

To update the book content from the official Nature of Code repository:

```bash
npm run sync-upstream
```

This will:
1. Pull the latest changes from the Nature of Code repository
2. Process markdown files and extract code examples
3. Rebuild the search index for AI context
4. Update static assets

## 🧪 Development

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build
```

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic previews for PRs

### Docker
```bash
docker compose up -d
```

### Self-hosted with Coolify
See `infra/coolify/` for configuration files.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Daniel Shiffman for creating The Nature of Code
- The Processing Foundation for p5.js
- Vercel for the AI SDK
- All contributors to the open-source tools used in this project