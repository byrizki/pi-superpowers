---
name: frontend-design
description: Use when building or improving web UI, pages, components, dashboards, landing pages, portfolios, HTML/CSS layouts, React/Vue/Svelte components, or visual styling where high-quality frontend design matters.
---

# Frontend Design

Create distinctive, production-grade frontend interfaces that avoid generic AI-looking UI. Build real working code with a clear aesthetic point of view, strong craft, and accessible interaction details.

## Design Thinking

Before coding, choose a BOLD aesthetic direction:
- **Purpose:** What does this interface solve? Who uses it?
- **Tone:** Pick a clear lane: brutal minimal, maximalist chaos, retro-futuristic, organic, luxury, playful, editorial, brutalist, art deco, pastel, industrial, etc.
- **Constraints:** Framework, performance, accessibility, content, existing design system.
- **Differentiation:** What one detail makes it memorable?

Commit to the concept. Maximalism and minimalism both work when intentional.

## Frontend Aesthetics Guidelines

- **Typography:** Use distinctive type choices. Avoid defaulting to Arial, Inter, Roboto, or system fonts unless project constraints demand them. Pair characterful display type with readable body type.
- **Color & Theme:** Use cohesive CSS variables. Prefer decisive palettes with sharp accents over timid evenly distributed colors.
- **Motion:** Add purposeful animation and micro-interactions. One well-orchestrated reveal beats scattered noise. Use CSS animation where enough; use project animation libraries only when already available or requested.
- **Spatial Composition:** Use asymmetry, overlap, diagonal flow, grid-breaking elements, generous negative space, or controlled density. Avoid predictable centered hero + cards unless strongly justified.
- **Backgrounds & Details:** Add atmosphere: texture, grain, geometric pattern, subtle depth, custom borders, unusual masks, shadows, or layered translucency when they match concept.

NEVER use generic AI-generated aesthetics: purple gradients on white, overused font stacks, bland cards, predictable layouts, empty decorative blobs, or cookie-cutter SaaS sections with no context-specific character.

## Implementation Rules

- Ship functional UI, not static mockups, unless user asked for mockup only.
- Preserve existing behavior and data flow when redesigning.
- Use semantic HTML and accessible labels/focus states.
- Respect existing framework and styling conventions.
- Add responsive behavior for mobile and desktop.
- Keep design system tokens when project has one; extend thoughtfully.

## Quality Bar

Before done, verify:
- Clear aesthetic direction visible in layout, type, color, and motion
- No generic AI slop patterns
- UI works at common viewport sizes
- Interactive states exist: hover/focus/active/disabled where relevant
- Contrast and keyboard navigation remain usable
- Code is maintainable and scoped to requested UI
