# CLAUDE.md - AI Assistant Context

This document provides essential context for AI assistants (Claude, GPT, etc.) working on the Nature of AI project. It serves as a quick reference to understand the project state and navigate the codebase effectively.

## 🎯 Project Overview

**Nature of AI** is an AI-augmented learning platform for "The Nature of Code" by Daniel Shiffman. It combines:
- Interactive book reading with live code examples
- AI-powered tutoring and debugging
- p5.js code playground
- Community features for sharing sketches

## 📍 Current State (2024-08-02)

### Completed
- ✅ Monorepo structure with npm workspaces
- ✅ Nature of Code upstream integration (git submodule)
- ✅ Next.js 14 app with TypeScript and Tailwind
- ✅ Vercel AI SDK integration
- ✅ Content sync scripts
- ✅ Basic development environment
- ✅ Comprehensive documentation system in `/dev-docs/`
- ✅ Playwright testing framework with E2E tests
- ✅ Book reader interface with chapter navigation
- ✅ Interactive code blocks with AI chat integration
- ✅ Code playground with Monaco Editor and p5.js preview
- ✅ Copy code and "Run in playground" functionality

### In Progress
- 🚧 Test suite stabilization (60/95 tests passing)
- 🚧 Responsive design improvements

### Pending
- ⏳ Supabase integration
- ⏳ User authentication
- ⏳ Progress tracking
- ⏳ Community features
- ⏳ Real content sync from Nature of Code repo
- ⏳ Search functionality
- ⏳ Performance optimization

## 🗺️ Key Navigation Points

### Documentation
- **Developer Docs**: `/dev-docs/` - All technical documentation
- **Architecture**: `/dev-docs/architecture/` - System design
- **API Docs**: `/dev-docs/api/` - Endpoint documentation
- **Testing**: `/dev-docs/testing/` - Test strategies

### Code Structure
```
/app              # Next.js frontend application
  /app            # App router pages
  /components     # React components
  /lib            # Utilities and helpers
  /public         # Static assets

/ai               # AI integration layer
  /lib            # Core AI utilities
  /providers      # AI provider adapters

/scripts          # Build and sync tools
  sync-upstream.ts    # Book content sync
  build-search-index.ts # Search indexing

/playground       # Code editor components (WIP)

/nature-of-code-upstream  # Book submodule
```

### Key Files
- `/app/app/api/chat/route.ts` - AI chat endpoint
- `/ai/lib/provider-factory.ts` - AI provider abstraction
- `/scripts/sync-upstream.ts` - Content synchronization
- `/app/components/chat.tsx` - Chat UI component

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Sync book content
npm run sync-upstream

# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🧪 Testing Approach

1. **Unit Tests**: Jest for components and utilities
2. **Integration Tests**: Testing API routes and data flow
3. **E2E Tests**: Playwright for user workflows
4. **Manual Testing**: Using Playwright MCP for exploration

## 📝 When Working on This Project

### Before Starting
1. Check `/dev-docs/progress/changelog.md` for recent changes
2. Review relevant ADRs in `/dev-docs/decisions/`
3. Look at current todos in the task management system

### While Working
1. Update documentation as you go
2. Write tests for new features
3. Use meaningful commit messages
4. Keep the todo list updated

### After Changes
1. Update `/dev-docs/progress/changelog.md`
2. Document any new patterns or decisions
3. Update this file if project structure changes
4. Run tests to ensure nothing breaks

## 🔑 Environment Variables

Required in `.env.local`:
- `OPENAI_API_KEY` - OpenAI API access
- `ANTHROPIC_API_KEY` - Anthropic API access
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key

## 🚨 Important Considerations

1. **Upstream Sync**: The Nature of Code content is in a git submodule
2. **AI Context**: Keep AI prompts focused on education and creative coding
3. **Performance**: Code playground must handle real-time p5.js execution
4. **Accessibility**: Ensure all features are keyboard navigable
5. **Mobile**: Design must be responsive for learning on any device

## 📊 Success Metrics

- Page load time < 2s
- AI response time < 1s for first token
- Code playground initialization < 500ms
- Test coverage > 80%

## 🔗 External Resources

- [Nature of Code Book](https://natureofcode.com/)
- [Nature of Code GitHub](https://github.com/nature-of-code/noc-book-2)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/)
- [p5.js Reference](https://p5js.org/reference/)
- [Supabase Docs](https://supabase.com/docs)