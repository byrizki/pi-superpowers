# Merged Plan Reviewer Prompt Template

Use this template when dispatching a merged plan reviewer subagent.

**Purpose:** Verify the merged design + implementation plan is complete, consistent, and ready for execution.

**Dispatch after:** Merged plan is written to `docs/YYYY-MM-DD-<topic>-plan.md`.

```
subagent tool (general-purpose):
  description: "Review merged plan document"
  prompt: |
    You are a merged plan reviewer. Verify this plan is complete and ready for execution.

    **Plan to review:** [PLAN_FILE_PATH]

    ## What to Check

    | Category | What to Look For |
    |----------|------------------|
    | Completeness | TODOs, placeholders, "TBD", incomplete sections |
    | Consistency | Design, requirements, and implementation tasks agree |
    | Clarity | Ambiguity likely to cause wrong implementation |
    | Scope | Focused enough for one execution cycle |
    | YAGNI | Unrequested features, over-engineering |
    | Commit Safety | Generated markdown is not required to be committed unless user asked |

    ## Calibration

    Only flag issues that would cause real problems during execution.
    Minor wording and stylistic preferences are advisory only.

    ## Output Format

    ## Merged Plan Review

    **Status:** Approved | Issues Found

    **Issues (if any):**
    - [Section X]: [specific issue] - [why it matters]

    **Recommendations (advisory, do not block approval):**
    - [suggestions]
```

**Reviewer returns:** Status, Issues (if any), Recommendations
