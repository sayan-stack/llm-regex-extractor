# Implementation Plan: llm-regex-extractor

This package aims to solve a massive pain point for developers out there: parsing messy outputs from LLMs (JSON mixed with markdown, code blocks wrapped in conversational text, etc.)

## Proposed Changes

### Setup and Configuration
We will use modern, fast tools:
#### [NEW] [package.json](file:///e:/github/llm-regex-extractor/package.json)
Initializes the project with dependencies: `typescript`, `tsup` (for bundling), and `vitest` (for tests).

#### [NEW] [tsconfig.json](file:///e:/github/llm-regex-extractor/tsconfig.json)
TypeScript configuration enabling strict mode and ES module output.

#### [NEW] [tsup.config.ts](file:///e:/github/llm-regex-extractor/tsup.config.ts)
Build configuration to emit both CommonJS and ESM formats with type declarations.

---

### Core Library
#### [NEW] [src/index.ts](file:///e:/github/llm-regex-extractor/src/index.ts)
The primary entry point containing the logic:
- `extractJson(text: string): Record<string, any> | null`
- `extractCodeBlock(text: string, language?: string): string | null`
- `extractAllCodeBlocks(text: string): Array<{ language: string, code: string }>`

---

### Tests
#### [NEW] [test/extract.test.ts](file:///e:/github/llm-regex-extractor/test/extract.test.ts)
A Vitest suite ensuring 100% coverage on complex LLM outputs (e.g., text before/after JSON, multiple code blocks, malformed markdown).

---

### CI/CD
#### [NEW] [.github/workflows/ci.yml](file:///e:/github/llm-regex-extractor/.github/workflows/ci.yml)
A GitHub Action that runs `npm install`, `npm run build`, and `npm run test` on every push to ensure project quality.

## Verification Plan

### Automated Tests
I will execute `npm run test` locally and verify that the tests successfully run and pass.

### Manual Verification
1. I will build the package using `npm run build`.
2. I will write an amazing `README.md` file explaining the pain point, how this library solves it, and how developers can utilize it.
3. You will publish it to your NPM account and GitHub.
