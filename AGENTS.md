# Repository Instructions

Read and follow these shared documents before making changes:

- `docs/ai/architecture.md`
- `docs/ai/coding-guidelines.md`
- `docs/ai/workflow.md`

Do not duplicate their contents here. Treat them as the source of truth for Cursor, Claude, and Codex.

## UI implementation

Before creating or changing UI:

1. Search `src/components` for an existing component.
2. Read `docs/ai/component-guidelines.md` and the relevant `docs/design-system/components/*.md`.
3. Inspect existing Storybook stories.
4. Use design tokens from `src/styles/tokens/`.
5. Do not add hard-coded colors, spacing, or radius values.

When creating or modifying a common component, finish all of the following in the same task:

1. Implement the component with token-based styles.
2. Add or update the Storybook story.
3. Add or update the usage doc under `docs/design-system/components/`.
4. Add or update the Vitest test for behavior, interaction, and accessibility contracts.
5. Check accessibility states.

## Validation

Before finishing UI work, self-review against `docs/ai/checklists/component-review.md`.

After UI or code changes, run:

```bash
yarn test:run
yarn lint
yarn typecheck
yarn build
```

If Storybook-related files changed, also run:

```bash
yarn build-storybook
```

## Pull requests and CI

- Create changes on a branch and open a pull request instead of merging generated code directly into `main`.
- GitHub Actions must pass `lint`, `typecheck`, `test`, and `build` before merge.
- When a check fails, inspect its log, fix the cause, push the correction to the same pull request, and repeat until every required check passes.
- Do not bypass, disable, or weaken a failing check to make a pull request mergeable.

## Report

When finished, report:

- changed files
- reused components
- added or updated variants/props
- validation results
