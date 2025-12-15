# Contributing to Design Instructions for AI

Thanks for your interest in contributing! This project helps developers get better results from AI coding assistants.

## Repository Structure

```
├── foundations/      # Tech stack setup (curated)
├── archetypes/       # App-type patterns (community)
├── patterns/         # Reusable UI patterns (community)
├── prompts/          # Ready-to-use prompts (community)
├── examples/         # Working apps (showcase)
└── apps/             # Work-in-progress builds
```

---

## Contribution Model

### 🔒 foundations/ — Curated

**PRs reviewed carefully.** Foundations are the base layer that everything else builds on.

- Must be thoroughly tested with multiple AI assistants
- Must include complete setup verification steps
- Must document common mistakes and lessons learned
- Breaking changes require discussion first

**To add a foundation:**
1. Open an issue describing the tech stack
2. Get feedback on scope and approach
3. Submit PR with full instruction file

### 🌱 patterns/ — Community

**Add new patterns freely.** Small, focused, reusable.

- Each pattern should solve one specific problem
- Include complete, working code examples
- Document both light and dark mode if applicable
- Test the code before submitting

**Good pattern ideas:**
- `infinite-scroll.md` — Virtualized lists
- `toast-notifications.md` — Non-blocking alerts
- `drag-and-drop.md` — Sortable lists
- `skeleton-loading.md` — Loading states

### 🌱 archetypes/ — Community

**Add new app types freely.** Build on top of foundations.

- Must specify which foundation(s) it works with
- Include screen layout diagrams
- Include complete component examples
- Document the file structure

**Good archetype ideas:**
- `dashboard.md` — Admin panels, data tables
- `chat-interface.md` — AI chat, messaging
- `landing-page.md` — Marketing, product pages
- `form-wizard.md` — Multi-step forms

### 🏆 examples/ — Showcase

**Each example must have a DECISIONS.md.** Show how instruction files come together.

- Include complete, runnable source code
- Document key decisions made during development
- Include problems encountered and solutions
- Reference which instruction files were used

---

## Instruction File Format

### Required Sections

```markdown
# [Name]

> One-line description

## Overview
What this covers and when to use it.

## [Main Content]
Patterns, setup steps, or usage examples.
Always include complete code.

## Common Mistakes
What NOT to do. Critical for AI.

## Lessons Learned (optional)
Real issues encountered and solutions.
```

### Guidelines

1. **Be explicit** — AI takes things literally
2. **Include complete examples** — Full component code, not snippets
3. **Document failures** — "Don't do X" is as valuable as "Do Y"
4. **Test with AI** — Verify instructions produce consistent results
5. **Use tables** — Great for dos/don'ts and quick reference

---

## File Naming

- All lowercase with hyphens
- Descriptive but concise
- Examples:
  - `nuxt-ui-v4.md` (foundation)
  - `puzzle-game.md` (archetype)
  - `glassmorphism.md` (pattern)
  - `start-new-project.md` (prompt)

---

## Pull Request Process

1. Fork the repo
2. Create a branch (`git checkout -b add-toast-pattern`)
3. Add your changes
4. Test with an AI assistant
5. Submit PR with:
   - What you added/changed
   - Which AI you tested with
   - Any notable learnings

---

## Testing Your Contribution

Before submitting, test your instruction file:

1. Start a new conversation with an AI assistant
2. Attach your instruction file
3. Ask the AI to implement something using it
4. Verify the output follows your patterns correctly
5. Try a few variations to ensure consistency

---

## Questions?

Open an issue! We're happy to help guide contributions.
