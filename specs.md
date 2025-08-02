# AI-Augmented Nature of Code Learning Platform

## Overview

This project aims to create an interactive, AI-powered version of *The Nature of Code* by Daniel Shiffman. The platform will embed the original book and code examples, leverage AI for tutoring, exploration, and debugging, and remain tightly linked to the official repo for code/content updates.

---

## Principles & Approach

- **Non-fork integration**: Use the canonical Nature of Code repo as a submodule so updates can be incorporated easily.
- **Composable AI modules**: AI features (chat, code explainer, learning companion) are layered *on top* of the book, not tangled with the book’s source.
- **End-user interactivity**: Each chapter/code block is live-editable, with AI support (via Vercel AI SDK) always available.
- **Cloud/database ready**: User state, favorites, and submissions are stored (e.g. via Supabase).

---

## Monorepo Structure

/ (root)
|-- app/ # Next.js/React frontend
|-- nature-of-code-upstream/ # Submodule of official book repo
|-- scripts/ # CLI tools for ingestion, indexing, & sync
|-- ai/ # Vercel AI SDK/Chat SDK logic, API routes
|-- playground/ # p5.js, Processing, code editors
|-- infra/ # Deployment configs (Coolify, Docker, Vercel)


---

## Tech Stack

- **Frontend**: React (Next.js), [Vercel AI SDK/Chat SDK](https://sdk.vercel.ai/), [Monaco](https://microsoft.github.io/monaco-editor/) or [CodeMirror](https://codemirror.net/) for code playgrounds, p5.js for sketches.
- **Backend/Infra**: Node.js (API routes), Supabase/Postgres for user state, Coolify/Vercel for deployment.
- **AI Layer**: Vercel AI SDK, built-in connectors for OpenAI, Claude, open-source models (local/LMS/Ollama).
- **Content Source**: Official [nature-of-code](https://github.com/nature-of-code/noc-book-2) repo as a submodule.

---

## Continuous Upstream Integration

- The `nature-of-code-upstream/` submodule is periodically updated (via CLI or GitHub Action).
- Custom `scripts/` parse the latest markdown/code, building:
  - A context-aware search index for the AI chat,
  - Static assets/HTML/JSON for direct rendering,
  - Dynamic mapping from book chapters and code blocks into webapp routes/pages.

---

## Key Features

- **Live Book**: Navigation mirroring official chapters/structure, markdown rendered on-demand from parsed upstream.
- **Live Playground**: Every code block is runnable, editable, and forkable with p5.js (and/or Processing.js) in-browser.
- **AI Chat**: Every page/section has an "Ask AI" button—uses Vercel AI SDK for chat/completions tailored to the current content/code context.
    - Explain code/concepts
    - Debug errors
    - Suggest project ideas or remix challenges
    - Adaptive feedback (“What should I try next?”)
- **User Accounts (optional)**: Supabase auth for saving progress, favorites, sketch sharing.
- **Content Sync**: `scripts/sync-upstream.sh` (or JS/TS) that pulls & processes the latest upstream repo in a repeatable way.

---

## Sample System Architecture

[User] <-> [Web UI: React/Next.js]
|
|--[Markdown/Book render (latest upstream)]
|--[Code Playground (p5.js, Monaco/CodeMirror)]
|--[AI Chat (Vercel AI SDK, context-aware)]
|
[API Routes: Next.js/Serverless]
|
[Supabase DB/Auth] (optional, for progress/sketches/users)


---

## Development/Deployment Notes

- **For development**:  
  - `git submodule update --init --recursive nature-of-code-upstream`
  - `npm run dev` to launch UI (parses/serves latest book)
  - `npm run sync-upstream` to trigger a resync/content update
  
- **On Deploy**:  
  - Use Coolify, Vercel, Netlify, or another PaaS
  - Automated workflow triggers a book submodule update & content indexing

---

## Vercel AI SDK Integration

- Include `@vercel/ai` in your API routes and UI—see [Vercel AI SDK docs](https://sdk.vercel.ai/).
- For each "Ask AI" feature, assemble input context as:
    ```
    {
      current_chapter: "...",
      current_code: "...",
      user_question: "...",
      (optional) user_progress: {...}
    }
    ```
  - Pass context to the LLM via Vercel’s SDK.
- Use streaming chat/completions for responsiveness.
- Support swap-out of model provider (OpenAI, Claude, local, etc.) via Vercel SDK adapters.

---

## Example `scripts/sync-upstream.js` (pseudo-code)

// Pseudo-code for syncing/processing upstream book
git.pull('nature-of-code-upstream')
parseMarkdownChapters('nature-of-code-upstream/chapters/')
for each chapter:
extract code blocks, build a JSON index
store in app/static/chapterData/
buildSearchIndex(app/static/chapterData/*)


---

## Example API Route (with Vercel AI SDK)

// /app/api/ai-explain.js
import { NextRequest } from 'next/server'
import { chat } from '@vercel/ai'
export async function POST(request) {
const payload = await request.json();
const { current_chapter, current_code, user_question } = payload;
return chat({
messages: [
{ role: 'system', content: You are an expert tutor for creative coding. You know all about the Nature of Code. Here is the current book section and code: ${current_chapter}\n\nCode:\n${current_code} },
{ role: 'user', content: user_question }
]
});
}


---

## Hand-off and Next Steps

- Set up repo as described.
- Assign:  
    - Book parsing & UI routing,
    - Code playground embedding,
    - Vercel AI SDK-based chat components,
    - Content sync scripts,
    - Auth (Supabase) and deployment basics.
- Document the submodule sync/update process for all contributors.

---

## Recommendations

- Keep AI completely composable: no hard-coded model dependencies.
- Add analytics/logging on what users ask AI, to improve the prompts and onboarding.
- Engage the open source/Nature of Code community for feedback and early testers.

---

## References

- Nature of Code book: https://natureofcode.com/
- Nature of Code GitHub: https://github.com/nature-of-code/noc-book-2
- Vercel AI SDK: https://sdk.vercel.ai/
- Monaco Editor: https://microsoft.github.io/monaco-editor/
- p5.js: https://p5js.org/
- Supabase: https://supabase.com/
