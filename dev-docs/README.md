# Nature of AI - Developer Documentation

This directory contains all developer documentation for the Nature of AI project. This documentation is designed to maintain project coherency and enable seamless collaboration between developers and AI assistants.

## 📁 Documentation Structure

```
dev-docs/
├── README.md              # This file - Documentation index
├── architecture/          # System design and architecture
│   ├── overview.md       # High-level architecture
│   ├── data-flow.md      # Data flow diagrams
│   └── tech-stack.md     # Technology decisions
├── api/                   # API documentation
│   ├── rest-endpoints.md # REST API endpoints
│   ├── ai-integration.md # AI SDK usage
│   └── websocket.md      # Real-time features
├── testing/              # Testing documentation
│   ├── strategy.md       # Testing approach
│   ├── playwright.md     # E2E test guide
│   └── coverage.md       # Coverage reports
├── deployment/           # Deployment guides
│   ├── vercel.md        # Vercel deployment
│   ├── coolify.md       # Self-hosted setup
│   └── docker.md        # Container configs
├── decisions/            # Architecture Decision Records
│   └── adr-*.md         # Individual decisions
└── progress/             # Development progress
    ├── changelog.md      # Feature changelog
    ├── roadmap.md        # Future plans
    └── weekly-*.md       # Weekly updates
```

## 🚀 Quick Links

- [Project Overview](./architecture/overview.md)
- [Current Progress](./progress/changelog.md)
- [Testing Guide](./testing/strategy.md)
- [API Documentation](./api/rest-endpoints.md)

## 📋 Key Documents

### For New Developers
1. Start with [Architecture Overview](./architecture/overview.md)
2. Review [Tech Stack](./architecture/tech-stack.md)
3. Follow [Testing Strategy](./testing/strategy.md)

### For AI Assistants
- See [CLAUDE.md](../CLAUDE.md) for AI-specific context
- Check [Current Progress](./progress/changelog.md) for latest state
- Review [Architecture Decisions](./decisions/) for context

## 🔄 Keeping Documentation Updated

When making changes:
1. Update relevant documentation files
2. Add entries to [changelog.md](./progress/changelog.md)
3. Update [CLAUDE.md](../CLAUDE.md) if it affects AI context
4. Create ADRs for significant decisions

## 📊 Project Status

**Current Phase**: Phase 2 - Content Pipeline & Core UI
**Last Updated**: 2024-08-02

See [roadmap.md](./progress/roadmap.md) for upcoming work.