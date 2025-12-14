# Contributing to Design Instructions for AI

Thanks for your interest in contributing! This project aims to help developers get better results from AI coding assistants.

## Ways to Contribute

### 1. Add a New Foundation

Foundations cover **tech stack setup** and **universal patterns**. Good candidates:
- A different frontend framework (SvelteKit, Next.js, etc.)
- A different UI library (Shadcn, DaisyUI, etc.)
- Backend patterns (API design, database setup)
- DevOps patterns (deployment, CI/CD)

### 2. Add a New Archetype

Archetypes cover **app-type specific patterns**. Good candidates:
- Dashboard / Admin panel
- E-commerce / Storefront
- Landing page / Marketing site
- Chat interface / AI assistant
- Form-heavy apps / Wizards
- Social feed / Timeline

### 3. Improve Existing Instructions

Found something that doesn't work? Have a better pattern? PRs welcome!

### 4. Add Example Apps

Built something using these instructions? Add it to `examples/`!

## Instruction File Format

### Required Sections

```markdown
# [Name]

> One-line description

## Overview
What this instruction file covers and when to use it.

## Setup
Step-by-step setup instructions with verification.

## Patterns
The core patterns with complete code examples.

## Common Mistakes
What NOT to do (this is crucial for AI).

## Lessons Learned
Real issues encountered and solutions.

## Checklist
Concrete deliverables to verify completion.
```

### Guidelines

1. **Be explicit** — AI takes things literally. Say exactly what you mean.

2. **Include complete examples** — Full component code, not snippets. AI needs context.

3. **Version carefully** — Either specify exact versions OR say "always use latest" with verification steps.

4. **Document failures** — "Don't do X" is as valuable as "Do Y".

5. **Test with AI** — Before submitting, test your instructions with an AI assistant to verify they produce consistent results.

## File Naming

- Foundations: `[stack-name].md` (e.g., `nuxt-ui-v4.md`, `nextjs-shadcn.md`)
- Archetypes: `[app-type].md` (e.g., `puzzle-game.md`, `dashboard.md`)
- Keep names lowercase with hyphens

## Example Apps

When adding an example:

1. Create a folder in `examples/[app-name]/`
2. Include a `README.md` explaining:
   - What the app does
   - Which instruction files were used
   - How to run it locally
3. Include the complete, working source code
4. Optionally include screenshots

## Pull Request Process

1. Fork the repo
2. Create a branch (`git checkout -b add-dashboard-archetype`)
3. Add your changes
4. Test with an AI assistant
5. Submit a PR with:
   - What you added/changed
   - Which AI you tested with
   - Any notable learnings

## Questions?

Open an issue! We're happy to help.
