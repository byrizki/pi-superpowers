import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const skillsRoot = path.resolve("skills");

function readSkill(relativePath: string): string {
  return readFileSync(path.join(skillsRoot, relativePath), "utf8");
}

function allMarkdownFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...allMarkdownFiles(full));
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}

test("all canonical Superpowers skills are present", () => {
  const required = [
    "brainstorming",
    "dispatching-parallel-agents",
    "executing-plans",
    "finishing-a-development-branch",
    "frontend-design",
    "receiving-code-review",
    "requesting-code-review",
    "subagent-driven-development",
    "systematic-debugging",
    "test-driven-development",
    "using-git-worktrees",
    "using-superpowers",
    "verification-before-completion",
    "writing-plans",
    "writing-skills",
  ];

  for (const name of required) {
    assert.equal(existsSync(path.join(skillsRoot, name, "SKILL.md")), true, `${name} missing`);
  }
});

test("subagent-driven-development uses pi-subagents and keeps canonical statuses", () => {
  const text = readSkill("subagent-driven-development/SKILL.md");
  assert.match(text, /subagent\s*\(\s*\{/);
  assert.match(text, /DONE_WITH_CONCERNS/);
  assert.match(text, /NEEDS_CONTEXT/);
  assert.match(text, /BLOCKED/);
  assert.match(text, /spec compliance.*code quality/is);
  assert.match(text, /superpowers-spec-reviewer/);
  assert.match(text, /superpowers-code-reviewer/);
  assert.doesNotMatch(text, /agentScope\s*:/);
  assert.doesNotMatch(text, /scope:\s*"user"/);
  assert.doesNotMatch(text, /agent:\s*"reviewer"/);
  assert.doesNotMatch(text, /Task\(/);
  assert.doesNotMatch(text, /Task tool/i);
});

test("parallel agents skill uses subagent parallel mode with small focused tasks", () => {
  const text = readSkill("dispatching-parallel-agents/SKILL.md");
  assert.match(text, /subagent\s*\(\s*\{\s*tasks:/s);
  assert.match(text, /small, focused/i);
  assert.match(text, /run as many independent subagents as safely possible/i);
  assert.match(text, /one narrowly scoped task per subagent/i);
  assert.match(text, /split.*too broad/is);
  assert.doesNotMatch(text, /Task\(/);
  assert.doesNotMatch(text, /Task tool/i);
});

test("reviewer agent templates are bundled as pi-subagents agent files", () => {
  const spec = readFileSync("agents/superpowers-spec-reviewer.md", "utf8");
  const code = readFileSync("agents/superpowers-code-reviewer.md", "utf8");

  for (const text of [spec, code]) {
    assert.match(text, /^---\n/);
    assert.match(text, /\nname: superpowers-/);
    assert.match(text, /\ntools: read, grep, find, ls, bash\n/);
    assert.match(text, /\nsystemPromptMode: replace\n/);
    assert.match(text, /\ninheritProjectContext: true\n/);
    assert.match(text, /\ninheritSkills: true\n/);
    assert.match(text, /Do not edit, write, delete, or modify files/);
  }
});

test("skills use todo tool instead of TodoWrite or plan_tracker operational instructions", () => {
  for (const file of allMarkdownFiles(skillsRoot)) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /TodoWrite/, `${file} still mentions TodoWrite`);
    assert.doesNotMatch(text, /plan_tracker/, `${file} still mentions plan_tracker`);
  }
});

test("using-superpowers requires upfront todos, not retroactive completion", () => {
  const text = readSkill("using-superpowers/SKILL.md");
  assert.match(text, /create all known todo items before starting work/i);
  assert.match(text, /Before finishing any todo, confirm the remaining known work already has todo items/i);
  assert.match(text, /Do not finish one todo, then create the next known todo/i);
  assert.match(text, /Never create a todo only to immediately mark it completed/i);
  assert.match(text, /Exactly one todo should be in_progress/i);
});

test("TDD skill preserves strictness for non-simple work and exposes complexity decision", () => {
  const text = readSkill("test-driven-development/SKILL.md");
  assert.match(text, /NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST/);
  assert.match(text, /Complexity Decision/i);
  assert.match(text, /Simple task: skipping TDD/);
  assert.match(text, /Medium|Complex/);
  assert.doesNotMatch(text, /Three Scenarios/i);
});

test("skills expose merged workflow monitor artifact and handoff contracts", () => {
  const brainstorming = readSkill("brainstorming/SKILL.md");
  assert.match(brainstorming, /docs\/YYYY-MM-DD-<topic>-plan\.md/);
  assert.match(brainstorming, /complexity/i);
  assert.match(brainstorming, /Simple task: skipping/);
  assert.match(brainstorming, /Do not commit/i);
  assert.doesNotMatch(brainstorming, /Visual Companion/i);
  assert.doesNotMatch(brainstorming, /docs\/specs\/YYYY-MM-DD-<topic>-design\.md/);

  const writingPlans = readSkill("writing-plans/SKILL.md");
  assert.match(writingPlans, /docs\/YYYY-MM-DD-<feature-name>-plan\.md/);
  assert.match(writingPlans, /Design Summary/);
  assert.match(writingPlans, /Do not commit/i);
  assert.match(writingPlans, /\/workflow-next execute <plan-path>/);
  assert.match(writingPlans, /\/skill:subagent-driven-development/);
  assert.match(writingPlans, /\/skill:executing-plans/);
});

test("frontend-design skill prevents generic AI-looking frontend work", () => {
  const text = readSkill("frontend-design/SKILL.md");
  assert.match(text, /distinctive, production-grade frontend/i);
  assert.match(text, /Design Read/i);
  assert.match(text, /variance.*motion.*density/is);
  assert.match(text, /official design system/i);
  assert.match(text, /redesign.*audit/is);
  assert.match(text, /hero.*2.*lines/is);
  assert.match(text, /CTA.*one line/is);
  assert.match(text, /maximum 1 eyebrow per 3 sections/i);
  assert.match(text, /WCAG.*4\.5:1/i);
  assert.match(text, /prefers-reduced-motion/i);
  assert.match(text, /transform.*opacity/i);
  assert.match(text, /Avoid/i);
  assert.match(text, /Inter|Roboto|Arial/);
  assert.match(text, /purple.*gradient/i);
  assert.match(text, /Lucide/i);
  assert.match(text, /h-screen/i);
  assert.match(text, /placeholder-as-label/i);
  assert.match(text, /React.*Next\.js/is);
  assert.match(text, /React Native|Expo/);
  assert.match(text, /44x44px|44×44px/);
});

test("execution skills expose todo and pi-subagents workflow monitor contracts", () => {
  const executing = readSkill("executing-plans/SKILL.md");
  assert.match(executing, /todo/i);
  assert.match(executing, /status:\s*"in_progress"/);
  assert.match(executing, /status:\s*"completed"/);
  assert.match(executing, /\/workflow-next verify <plan-path>/);

  const sdd = readSkill("subagent-driven-development/SKILL.md");
  assert.match(sdd, /agent:\s*"worker"/);
  assert.match(sdd, /small, focused/i);
  assert.match(sdd, /run as many independent subagents as safely possible/i);
  assert.match(sdd, /parallel/i);
  assert.match(sdd, /agent:\s*"superpowers-spec-reviewer"/);
  assert.match(sdd, /agent:\s*"superpowers-code-reviewer"/);
  assert.match(sdd, /Keep these agent names exact|agent names are part of the runtime contract/i);
  assert.doesNotMatch(sdd, /agent:\s*"code-reviewer"/);
  assert.doesNotMatch(sdd, /agent:\s*"spec-reviewer"/);
});

test("review verification finish TDD and debugging skills expose monitor contracts", () => {
  const verification = readSkill("verification-before-completion/SKILL.md");
  assert.match(verification, /source edit.*stale/i);
  assert.match(verification, /\/workflow-next review/);

  const review = readSkill("requesting-code-review/SKILL.md");
  assert.match(review, /agent:\s*"superpowers-code-reviewer"/);
  assert.match(review, /canonical review phase signal|review phase signal/i);
  assert.match(review, /\/workflow-next finish/);

  const finish = readSkill("finishing-a-development-branch/SKILL.md");
  assert.match(finish, /git commit/);
  assert.match(finish, /git push/);
  assert.match(finish, /gh pr create/);
  assert.match(finish, /\/workflow-reset/);

  const tdd = readSkill("test-driven-development/SKILL.md");
  assert.match(tdd, /RED-PENDING/);
  assert.match(tdd, /REFACTOR/);
  assert.match(tdd, /guardrails/i);

  const debugging = readSkill("systematic-debugging/SKILL.md");
  assert.match(debugging, /investigation activity/i);
  assert.match(debugging, /repeated fixes fail|repeated fix attempts/i);
});
