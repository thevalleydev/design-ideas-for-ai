# Design Instructions for AI

> A collection of AI-readable instruction files that teach AI assistants how to build beautiful, functional applications.

## What is this?

When working with AI coding assistants (Claude, GPT, Copilot, Cursor, etc.), the quality of the output depends heavily on the instructions you provide. This repo contains **battle-tested instruction files** that produce consistent, high-quality designs.

Think of these as "design system prompts" — structured documents that teach AI:
- Which tech stack to use and how to set it up correctly
- Design patterns that work well together
- Common pitfalls to avoid
- Component architectures that scale

## Quick Start

1. Copy the relevant instruction files to your project
2. Reference them in your AI conversation or attach them as context
3. The AI will follow the patterns and produce consistent results

```bash
# Example: Starting a new puzzle game
# 1. Grab the foundation + archetype
cp foundations/nuxt-ui-v4.md your-project/
cp archetypes/puzzle-game.md your-project/

# 2. Tell your AI assistant:
# "Read these instruction files and help me build a word puzzle game"
```

## Structure

```
├── foundations/          # Tech stack setup & core patterns
│   ├── nuxt-ui-v4.md    # Nuxt 4 + Nuxt UI setup, theming, mobile
│   └── ...
│
├── archetypes/           # App-type specific patterns
│   ├── puzzle-game.md   # Timed games, keyboards, animations
│   ├── dashboard.md     # Admin panels, data tables (coming soon)
│   └── ...
│
├── examples/             # Working example apps
│   └── upwords/         # Word chain puzzle game
│
└── .vscode/
    └── mcp.json         # MCP config for VS Code AI tools
```

## Foundations

Foundation files cover **tech stack setup** and **universal patterns**:

| File | What it teaches |
|------|-----------------|
| `nuxt-ui-v4.md` | Nuxt 4 + Nuxt UI v4 setup, dark/light theming, glassmorphism, animations, mobile-first patterns |

## Archetypes

Archetype files cover **app-type specific patterns**:

| File | Best for |
|------|----------|
| `puzzle-game.md` | Timed games, word games, casual mobile games |
| `dashboard.md` | Admin panels, analytics, data management *(coming soon)* |
| `landing-page.md` | Marketing sites, product pages *(coming soon)* |
| `chat-interface.md` | AI chat, messaging, support *(coming soon)* |

## Examples

Working apps built using these instructions:

| App | Description | Instructions Used |
|-----|-------------|-------------------|
| [Upwords](examples/upwords/) | Word chain puzzle game | `nuxt-ui-v4.md` + `puzzle-game.md` |

## Philosophy

### Why instruction files?

AI assistants are powerful but inconsistent. They might:
- Install outdated package versions
- Mix incompatible libraries
- Create designs that look "AI-generated"
- Miss mobile considerations
- Ignore accessibility

Instruction files solve this by providing **explicit, tested patterns** that produce reliable results.

### What makes a good instruction file?

1. **Specific versions** — Or better, "always use latest" with verification steps
2. **Complete examples** — Full component code, not snippets
3. **Common mistakes** — What NOT to do is as important as what to do
4. **Lessons learned** — Real issues encountered and how to fix them
5. **Checklists** — Concrete deliverables to verify completion

### How these were created

Each instruction file was created by:
1. Building a real app with AI assistance
2. Documenting what worked and what didn't
3. Refining the instructions until the AI produced consistent results
4. Extracting reusable patterns into foundation/archetype files

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- Add new archetypes (dashboard, e-commerce, etc.)
- Add new foundations (different tech stacks)
- Improve existing instructions based on your experience
- Add example apps that demonstrate the patterns

## License

MIT — Use these however you want. If they help you build something cool, we'd love to hear about it!

---

*Built with the help of Claude, for use with any AI assistant.*
