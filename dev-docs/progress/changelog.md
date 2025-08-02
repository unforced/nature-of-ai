# Changelog

All notable changes to the Nature of AI project are documented here.

## [Unreleased]

### Phase 2: Content Pipeline & Core UI - In Progress

#### Added - 2024-08-02
- Comprehensive developer documentation structure in `/dev-docs/`
- `CLAUDE.md` for AI assistant context and navigation
- Architecture overview documentation
- Project changelog and progress tracking
- Playwright testing framework with E2E tests
- Book reader interface with chapter navigation
- Interactive code blocks with AI integration
- Copy code and "Ask AI" functionality
- Responsive design for mobile devices
- Chapter content component with mock data
- Navigation between chapters
- Homepage links to book sections

### Phase 1: Project Foundation - Completed

#### Added - 2024-08-02
- Initial monorepo structure with npm workspaces
- Nature of Code repository integrated as git submodule
- Next.js 14 application with App Router
- TypeScript configuration with path aliases
- ESLint and Prettier setup
- Tailwind CSS with custom theme
- Vercel AI SDK integration
- Basic chat component and API endpoint
- Content sync scripts for upstream book
- Search index builder
- Environment configuration files
- MIT License
- Comprehensive README

#### Project Structure
```
nature-of-ai/
├── app/                    # Next.js application
├── ai/                     # AI logic and providers
├── scripts/                # Sync and processing tools
├── playground/             # Code editor components
├── nature-of-code-upstream/ # Book submodule
├── infra/                  # Deployment configs
└── dev-docs/              # Developer documentation
```

## Version History

### [0.1.0] - 2024-08-02
- Initial project setup
- Core infrastructure in place
- Ready for feature development

---

## Upcoming Work

See [roadmap.md](./roadmap.md) for planned features and timeline.