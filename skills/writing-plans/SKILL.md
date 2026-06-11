---
name: writing-plans
description: Use when you have approved requirements or design for a multi-step task, before touching code
---

# Writing Plans

## Overview

Write one merged design + implementation plan. Assume the engineer has little repo context. Document files, steps, tests, validation, and handoff. DRY. YAGNI. TDD when complexity warrants it. Frequent commits for implementation work only.

**Announce at start:** "I'm using the writing-plans skill to create the merged plan."

**Save plans to:** `docs/YYYY-MM-DD-<feature-name>-plan.md`
- User preferences for plan location override this default.
- **Do not commit generated markdown** unless the user explicitly asks.

## Complexity Decision

Before writing plan, record complexity and workflow weight:

- **Simple**: single-file text/config/doc tweak, low risk, reversible, no behavior change. Plan may be skipped; say `Simple task: skipping <steps> because <reason>.`
- **Medium**: behavior or multi-file change. Include concise design, targeted tasks, and useful tests.
- **Complex**: feature, architecture change, risky refactor, bug hunt, data/security impact. Include full design, task-by-task TDD, verification, review, and execution handoff.

User instructions override this rubric.

## Scope Check

If requirements cover independent subsystems, split into separate plans. Each plan should produce working, testable software on its own.

## File Structure

Before tasks, map files to responsibilities:

- Exact files to create/modify.
- One clear responsibility per file where practical.
- Existing patterns followed.
- Targeted refactors only when required by goal.

## Plan Document Header

Every merged plan starts with:

```markdown
# [Feature Name] Plan

> **For agentic workers:** Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans for medium/complex implementation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [One sentence]
**Complexity:** [Simple | Medium | Complex] — [why]
**Workflow:** [Skipped steps or required skills]
**Architecture:** [2-3 sentences]
**Tech Stack:** [Key technologies/libraries]

---
```

## Required Sections

```markdown
## Design Summary
[Approved design in concise form]

## Requirements
- [Specific requirement]

## Non-goals
- [Explicit out-of-scope item]

## Approach / Architecture
[Components, data flow, errors, compatibility]

## File Plan
- Modify: `exact/path.ts` — reason
- Test: `tests/exact.test.ts` — coverage

## Implementation Plan
[Tasks below]

## Validation
- Command: `npm test`
- Expected: all tests pass
```

## Bite-Sized Task Granularity

For medium/complex work, each task should be executable independently. Use TDD where behavior changes.

````markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.ts:123-145`
- Test: `tests/exact/path/to/test.ts`

- [ ] **Step 1: Write the failing test**

```ts
test("specific behavior", () => {
  const result = functionUnderTest(input);
  assert.equal(result, expected);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/path.test.ts`
Expected: FAIL because behavior is missing

- [ ] **Step 3: Write minimal implementation**

```ts
export function functionUnderTest(input: Input): Output {
  return expected;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/path.test.ts`
Expected: PASS

- [ ] **Step 5: Verify scope**

Run: `npm test`
Expected: all tests pass
````

Do not include a commit step for generated plan markdown. Implementation plans may mention code commits only when user wants commit workflow.

## No Placeholders

Never write:
- TBD, TODO, implement later, fill in details
- Add appropriate error handling
- Write tests for the above
- Similar to Task N
- References to undefined functions/types

## Self-Review

After writing plan:

1. **Requirement coverage:** every requirement maps to a task or validation item.
2. **Placeholder scan:** remove vague instructions.
3. **Type consistency:** names/signatures match across tasks.
4. **Commit check:** generated markdown is not staged or committed unless user asked.

Fix issues inline.

## Execution Handoff

Workflow monitor recognizes `docs/*-plan.md`.
For fresh execution: `/workflow-next execute <plan-path>`.

After saving, say:

**"Merged plan complete and saved to `docs/<filename>-plan.md`. I did not commit it. Execution options:**

**1. Subagent-Driven (recommended for medium/complex)** - fresh subagent per task, review between tasks

**2. Inline Execution** - execute tasks in this session with checkpoints

**3. Skip execution for now** - leave plan for later

**Which approach?"**

If Subagent-Driven: **REQUIRED SUB-SKILL:** `/skill:subagent-driven-development`
If Inline Execution: **REQUIRED SUB-SKILL:** `/skill:executing-plans`
