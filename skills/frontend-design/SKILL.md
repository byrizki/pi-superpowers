---
name: frontend-design
description: Use when building or improving web UI, pages, components, dashboards, landing pages, portfolios, HTML/CSS layouts, React/Vue/Svelte components, or visual styling where high-quality frontend design matters.
---

# Frontend Design

Create distinctive, production-grade frontend interfaces that avoid generic AI-looking UI. Build working, accessible code with a clear aesthetic point of view, strong layout craft, and interaction detail. Pull from the brief, not from defaults.

## 1. Read the Brief First

Before coding, state one short **Design Read** unless user asked for silent implementation:

> Reading this as: `<page kind>` for `<audience>`, with `<vibe>` language, leaning toward `<design system or aesthetic family>`.

Read these signals:
- Page kind: landing, dashboard, admin, portfolio, e-commerce, editorial, mobile, product UI, redesign.
- Audience: buyer, developer, recruiter, public-sector user, consumer, analyst, internal operator.
- Existing assets: brand colors, logo, typography, screenshots, design tokens, components.
- Quiet constraints: accessibility, regulated domain, performance budget, no new dependencies, design system lock.

If the brief can diverge in two incompatible visual directions, ask one question. Otherwise infer and proceed.

Set three dials mentally and let them drive choices:
- **Design variance**: 1 = strict/system UI, 10 = experimental/Awwwards.
- **Motion intensity**: 1 = static, 10 = cinematic/scroll-driven.
- **Visual density**: 1 = gallery whitespace, 10 = cockpit/data-dense.

Typical presets: public-sector `3/2/5`; dashboard `4/3/8`; SaaS landing `7/5/4`; portfolio `8/6/3`; experimental campaign `9/8/4`.

## 2. Choose Foundation Honestly

Use an **official design system** when the brief clearly maps to one. Do not fake it with hand-rolled CSS:
- Microsoft/enterprise: Fluent UI.
- Google/Material product: Material 3.
- IBM/data-heavy enterprise: Carbon.
- Shopify admin: Polaris.
- Atlassian/Jira-like: Atlaskit.
- GitHub/dev community: Primer.
- UK/US public-sector: GOV.UK Frontend or USWDS.
- Accessible React foundation: Radix Themes/primitives.
- Owned-code SaaS: shadcn/ui, but never ship default visual state.

One system per project. Do not mix Fluent, Carbon, Material, and shadcn randomly.

When redesigning, audit first: framework, styling method, current tokens, reusable components, typography, color, layout, states, accessibility, and what must not break. Preserve behavior and data flow. Upgrade targeted surfaces; do not rewrite from scratch unless requested.

## 3. Pick One Aesthetic Family

Choose one family and commit; do not mix conflicting modes.

- **Premium minimalist/editorial:** warm monochrome, strong type hierarchy, flat bento grids, muted pastel accents, minimal shadows.
- **High-end agency/luxury:** macro whitespace, cinematic rhythm, tactile surfaces, nested card/CTA architecture, subtle grain.
- **Industrial brutalist/telemetry:** rigid grid, mono metadata, uppercase structural type, square corners, visible dividers, utilitarian accent.
- **Dark technical/product:** off-black, crisp type, restrained glow, dense but legible instrumentation.
- **Playful/consumer:** rounded shapes, expressive color, tactile micro-interactions, but still consistent and accessible.
- **Data/dashboard:** density, tabular numbers, clear hierarchy, semantic colors, no decorative clutter.

Aesthetic families are not skins. Layout, type, motion, corners, icons, and copy must all speak same language.

## 4. Anti-Slop Defaults to Avoid

Avoid these unless user or existing brand explicitly requires them:
- Inter, Roboto, Arial, Open Sans, browser/system default as unconscious font choice.
- Purple/blue AI gradient on white, random neon glow, generic mesh blob hero.
- Lucide/Feather icons as default; use existing icon set or pick one family and standardize stroke/weight.
- Three equal feature cards, centered hero + cards, zigzag sections repeated more than twice.
- Placeholder names/content: John Doe, Jane Smith, Acme Corp, Lorem Ipsum.
- AI copy: Elevate, Seamless, Unleash, Next-Gen, Game-changer, Delve, Tapestry, "In the world of...".
- Emoji as icons unless brief explicitly asks for playful/social-native tone.
- `h-screen` for full viewport sections; use `min-h-[100dvh]` to avoid mobile browser jumps.
- Placeholder-as-label in forms.
- Heavy black drop shadows, generic `shadow-md`, mixed corner-radius systems, arbitrary `z-[9999]`.
- One-off raw hex values scattered in components; use tokens/CSS variables.

## 5. Layout Rules That Prevent Broken-Looking UI

- Hero should fit initial viewport: headline max 2 lines desktop, subtext max 20 words, primary CTA visible without scrolling.
- CTA text should fit on one line. Desktop-wrapped CTAs are broken; shorten label or widen button.
- Use one primary CTA intent per screen. Do not mix "Get started", "Start now", "Contact us", "Let's talk" for same action.
- Navigation must stay one line at desktop; condense or collapse instead of wrapping.
- Maximum 1 eyebrow per 3 sections. Do not put uppercase tracking labels above every section.
- Avoid split header as default (`big headline left + small paragraph right`) unless the right side contains a real visual/interactive element.
- Bento grids need exactly as many cells as content requires; no blank filler tiles. Use `grid-flow-dense` only when it truly improves packing.
- Multi-section pages need varied section families: hero, bento, proof, comparison, quote, CTA, etc. Do not repeat same image/text split endlessly.
- Mobile collapse must be explicit for every multi-column/asymmetric layout.
- Use CSS Grid for multi-column layouts; avoid fragile flex percentage math.
- Control line length: body copy ~60-75 characters desktop, shorter on mobile.

## 6. Typography, Color, Surfaces

Typography:
- Choose fonts with character and purpose. Good sans options: Geist, Satoshi, Cabinet Grotesk, Outfit, Switzer, Plus Jakarta Sans. Mono: Geist Mono, JetBrains Mono, IBM Plex Mono.
- Serif only when brand/aesthetic justifies editorial, luxury, heritage, or publication tone. Do not inject random serif words into sans headlines for fake sophistication.
- Large headlines need tight tracking and line-height, but protect italic descenders (`y g j p q`) with enough line-height/padding.
- Use tabular/monospace numbers for data, prices, timers, and metrics.
- Use `text-wrap: balance` or `pretty` where supported to prevent orphans.

Color:
- Pick one palette and lock it across whole page. No warm/cool gray mixing.
- Prefer one accent color. Functional colors still need semantic meaning and accessible contrast.
- Avoid beige+brass+espresso as default premium-consumer palette unless brand truly demands it.
- Dark backgrounds should be off-black/tinted (`#0A0A0A`, charcoal, navy), not pure `#000` by default.
- Button and form contrast must pass **WCAG 4.5:1** for normal text (3:1 for large text/icons).

Surfaces:
- Cards only when elevation communicates hierarchy. Otherwise use whitespace, `border-t`, `divide-y`, or background contrast.
- If using shadows, tint to environment; avoid generic black shadows.
- Add subtle texture/noise/pattern/imagery only if it supports aesthetic. Do not decorate randomly.
- Pick a radius system and follow it: all-sharp, all-soft, or documented mix.

## 7. Interaction, Motion, and States

Every interactive UI needs visible hover, focus, active, disabled, loading, empty, and error states where relevant.

Motion rules:
- Motion must communicate cause/effect, hierarchy, continuity, or feedback; not decoration alone.
- Respect `prefers-reduced-motion`; reduce or disable non-essential animation.
- Animate `transform` and `opacity`, not top/left/width/height.
- Use custom easing/spring-like curves; avoid default linear or generic ease-in-out for premium work.
- Keep micro-interactions fast (150-300ms); complex transitions rarely need >500ms.
- Use skeletons matching final layout for loading instead of generic spinners.
- Avoid scroll listeners for animation; prefer CSS, IntersectionObserver, or framework primitives.
- Blurs/backdrop filters are expensive; reserve for fixed/sticky overlays/navs, not large scrolling containers.

React, Next.js, React Native, and Expo guidance:
- Check package.json before importing any library.
- In Next.js, isolate interactive/motion pieces as small client leaves; keep static layout in Server Components when possible.
- Use `next/font` or self-hosted fonts with `font-display: swap`.
- Dynamically import heavy visualizations, maps, editors, animation-heavy modules.
- Avoid re-rendering on pointer/scroll motion; use refs or motion values.
- Prefer composition/variants over boolean-prop explosion for reusable components.
- Use native View Transitions only when they express spatial continuity; unsupported browsers must degrade gracefully.
- For React Native or Expo, respect platform idioms: safe areas, native navigation, `Pressable`, `expo-image`, virtualized/FlashList lists, and animations driven by transform/opacity.

## 8. Forms, Navigation, and Product UX

Forms:
- Labels above inputs; never placeholder-as-label.
- Helper text near field; error text below field; summary for multiple errors.
- Focus first invalid field after submit.
- Use input types/autocomplete for mobile keyboards and autofill.
- Confirm destructive actions; offer undo when practical.

Navigation:
- Current location must be visible.
- Provide back/escape routes in dead-end pages, modals, and multi-step flows.
- Preserve scroll/filter/input state on back navigation where practical.
- Icon-only nav harms discoverability unless context is obvious; pair text where needed.

Accessibility/performance basics:
- Semantic HTML: `nav`, `main`, `section`, `article`, `aside`, `form`, `button`.
- Alt text for meaningful images; decorative images use empty alt only when truly decorative.
- Keyboard navigation and visible focus rings are required.
- Do not convey status by color alone.
- Reserve media dimensions/aspect ratios to prevent layout shift.
- Use responsive images, lazy load below-fold media, and avoid horizontal scroll.
- Keep touch targets at least 44x44px and spaced enough for mobile.

## 9. Pre-Flight Check

Before done, verify:
- Design Read is reflected in type, layout, color, motion, and content.
- Existing system/stack respected; dependencies verified before import.
- No generic AI defaults from avoid list unless justified by brand.
- Hero, nav, CTA labels, bento grids, eyebrows, and mobile collapse pass layout rules.
- WCAG 4.5:1 contrast, focus states, keyboard paths, alt text, reduced motion, and semantic HTML are handled.
- Loading, empty, error, disabled, hover, focus, and active states exist where relevant.
- Animations use transform/opacity and respect performance budget/Core Web Vitals.
- Copy is specific, realistic, and free of AI clichés.
- Final UI works at mobile, tablet, and desktop sizes.
