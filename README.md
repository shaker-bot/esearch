# eSearch

A modern, AI chatbot-style search interface built with Vue 3 and Vite. Designed as a clean, extensible frontend shell — ready to be wired up to any language model API, search backend, or RAG pipeline.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | Scoped component CSS + CSS custom properties |
| State | Reactive `ref` / composables (no external store) |
| Theming | CSS variables with `data-theme` attribute toggling |
| Markdown | [marked](https://marked.js.org/) + [DOMPurify](https://github.com/cure53/DOMPurify) |
| Testing | [Vitest](https://vitest.dev/) + [@vue/test-utils](https://test-utils.vuejs.org/) (jsdom) |

No external UI library, no CSS framework, no router — intentionally lean.

---

## Project Structure

```
esearch/
├── index.html                    # Vite entry point
├── vite.config.js                # Vite + Vitest config
├── package.json
└── src/
    ├── main.js                   # App mount
    ├── App.vue                   # Root component — owns chat state
    ├── composables/
    │   ├── useTheme.js           # Singleton dark/light theme composable
    │   ├── useMessages.js        # Singleton messages composable with localStorage sync
    │   └── __tests__/
    │       ├── useTheme.test.js
    │       └── useMessages.test.js
    ├── styles/
    │   └── global.css            # CSS reset, variables, theme definitions, scrollbars
    ├── test/
    │   └── setup.js              # Global Vitest setup (localStorage reset)
    └── components/
        ├── AppHeader.vue         # Logo + theme toggle + clear conversation button
        ├── HeroSection.vue       # Landing tagline (hidden after first message)
        ├── ChatThread.vue        # Scrollable message list (ARIA live region)
        ├── MessageBubble.vue     # Individual message — markdown for responses, ARIA
        ├── InputBar.vue          # Auto-resizing textarea + send button
        └── __tests__/
            ├── AppHeader.test.js
            ├── ChatThread.test.js
            ├── MessageBubble.test.js
            └── InputBar.test.js
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Run unit tests (watch mode)
npm run test

# Run unit tests (single pass)
npm run test:run
```

---

## Features

- **Conversational UI** — chat bubble layout with distinct user and response sides
- **Dark / light mode** — toggles via a header button; defaults to dark; state managed by a reusable singleton composable
- **Smooth animations** — directional message slide-in (left/right per role), staggered hero text, theme crossfades, send button press feedback
- **Markdown rendering** — response bubbles render full GitHub-flavored markdown (bold, italic, code blocks, lists, blockquotes, links) via `marked`, sanitized with `DOMPurify`
- **Conversation persistence** — chat history survives page refresh via `localStorage`; clear button in the header wipes it
- **Themed scrollbars** — custom scrollbar track/thumb colours that follow the active theme
- **Auto-resizing input** — textarea grows with content up to a max height
- **Keyboard shortcuts** — `Enter` to send, `Shift+Enter` for a new line
- **Typing indicator** — animated bouncing dots while a response is being prepared
- **Accessibility (WCAG)** — skip-to-main link, `role="log"` live region on the thread, `role="article"` per message, `aria-busy` during responses, `role="status"` on the typing indicator, `aria-hidden` on decorative elements, visually-hidden `<label>` on the input, 44px minimum touch targets, 16px textarea font (prevents iOS zoom), keyboard-focusable thread with `:focus-visible` ring
- **Mobile-responsive** — fluid layout using `100dvh`, reduced padding, wider bubbles, and hidden hint text on small screens

---

## Possible Applications

The interface is intentionally decoupled from any data source. The `handleSend` function in `App.vue` is the single integration point — swap out the echo logic for any of the following:

- **AI chat assistant** — connect to OpenAI, Anthropic, Gemini, or any streaming LLM API
- **Semantic / vector search** — front-end for a Pinecone, Weaviate, or pgvector-backed search engine
- **RAG (Retrieval-Augmented Generation)** — pair with a document ingestion pipeline for knowledge-base Q&A
- **Customer support bot** — route queries to a support backend or ticketing system
- **Internal tool search** — search across internal wikis, codebases, or databases
- **Voice interface** — add Web Speech API for speech-to-text input

---

## Roadmap

- [ ] Connect to an LLM API with streaming support
- [x] Persist conversation history (localStorage)
- [x] Markdown rendering in response bubbles
- [ ] Conversation sidebar / history panel
- [x] Mobile-responsive layout improvements
- [x] Accessibility audit (ARIA, keyboard navigation)
- [x] Unit test suite (Vitest + @vue/test-utils)
