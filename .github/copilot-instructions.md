# GitHub Copilot Workspace Instructions

> This repo contains AI-readable instruction files for building polished applications.

## Repository Structure

```
├── foundations/      # Tech stack setup & universal patterns
├── archetypes/       # App-type specific patterns  
├── patterns/         # Reusable UI/UX patterns
├── prompts/          # Ready-to-use prompt templates
├── examples/         # Working example apps with source code
└── apps/             # Work-in-progress builds
```

## How to Use These Files

### When helping users build new apps:

1. **Check for relevant foundation** — Look in `foundations/` for tech stack setup (e.g., `nuxt-ui-v4.md` for Nuxt + Nuxt UI projects)

2. **Check for relevant archetype** — Look in `archetypes/` for app-type patterns (e.g., `puzzle-game.md` for games, `dashboard.md` for admin panels)

3. **Check for specific patterns** — Look in `patterns/` for reusable UI patterns (e.g., `glassmorphism.md`, `animated-lists.md`, `wordle-keyboard.md`)

4. **Reference examples** — Look in `examples/` for working implementations. Each example has a `DECISIONS.md` documenting key choices made.

### When users ask to "start a new project":

1. Suggest they use `prompts/start-new-project.md` as a template
2. Help them identify which foundation + archetype combination fits their needs
3. Reference the instruction files as you generate code

## Instruction File Format

All instruction files follow this structure:

- **Overview** — When to use this file
- **Setup** — Step-by-step with verification
- **Patterns** — Complete, working code examples
- **Common Mistakes** — What NOT to do (critical for avoiding errors)
- **Lessons Learned** — Real issues and solutions
- **Checklist** — Deliverables to verify completion

## Key Principles

1. **Always use latest package versions** — Check official docs before suggesting install commands
2. **Include complete examples** — Full component code, not snippets
3. **Follow the patterns exactly** — These are battle-tested
4. **Check for duplicates** — Before adding CSS classes or utilities, check if they exist
5. **Mobile-first** — All patterns are designed for mobile-first

## Example Workflow

User: "Help me build a word puzzle game"

1. Read `foundations/nuxt-ui-v4.md` for setup
2. Read `archetypes/puzzle-game.md` for game patterns
3. Reference `examples/upwords/` for a working implementation
4. Check `patterns/wordle-keyboard.md` for keyboard component
5. Check `patterns/animated-lists.md` for word animations

## MCP Integration

This repo includes `.vscode/mcp.json` for AI tool integration:

```json
{
  "servers": {
    "nuxt-ui": {
      "type": "http",
      "url": "https://ui.nuxt.com/mcp"
    }
  }
}
```

This gives you access to Nuxt UI component documentation when helping users.
