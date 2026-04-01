# 🦖 llm-regex-extractor

<p align="center">
  <img src="https://img.shields.io/npm/v/llm-regex-extractor.svg?style=for-the-badge&color=success" alt="NPM Version" />
  <img src="https://img.shields.io/npm/dt/llm-regex-extractor.svg?style=for-the-badge" alt="NPM Downloads" />
  <img src="https://img.shields.io/github/license/sayan-stack/llm-regex-extractor.svg?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/github/actions/workflow/status/sayan-stack/llm-regex-extractor/ci.yml?branch=main&style=for-the-badge" alt="Build Status" />
</p>

<p align="center">
  <strong>A lightning-fast, zero-dependency RegExp utility designed specifically to extract JSON and code blocks from messy Large Language Model (LLM) text outputs.</strong>
</p>

---

## 💡 The Problem
LLMs like Claude, GPT-4, and Llama are incredibly smart but terribly formatted. They often wrap their structured JSON or code outputs in conversational markdown text (e.g., `Here is your output: \`\`\`json ... \`\`\``). 

If you are building an AI agent or an AI pipeline, writing brittle parsing logic to strip away this conversational text is an absolute nightmare.

## ⚡ The Solution
`llm-regex-extractor` perfectly and safely extracts the inner JSON or code snippet using heavily-tested RegExp logic. No dependencies. Lightning fast. 100% test coverage.

## 🚀 Installation

```bash
npm install llm-regex-extractor
```

## 🛠️ Usage

### Extract JSON
If the LLM responds with a mix of text and JSON, this function will cleanly parse out the JSON block, regardless of what conversational filler surrounds it.

```typescript
import { extractJson } from 'llm-regex-extractor';

const llmResponse = `Sure, here is your required data:
\`\`\`json
{
  "status": "success",
  "data": [1, 2, 3]
}
\`\`\`
Hope this helps!`;

const data = extractJson(llmResponse);
console.log(data); // { status: "success", data: [1, 2, 3] }
```

### Extract Code Blocks
Extract specific language code blocks seamlessly and securely.

```typescript
import { extractCodeBlock, extractAllCodeBlocks } from 'llm-regex-extractor';

const text = `
Here is the Python logic:
\`\`\`python
def hello():
    print("world")
\`\`\`
`;

const pythonCode = extractCodeBlock(text, 'python');
// >> def hello():\n    print("world")
```

---

## 🧪 Testing and CI

This package uses `vitest` for 100% robust test coverage and is continuously validated through automated GitHub Action pipelines.

```bash
# Run tests locally
npm run test

# Build the Typescript output
npm run build
```

---

## 🤝 Contributing
Open source Open minds. We welcome all contributions! 
1. Dive into `CONTRIBUTING.md` for our standardized code guidelines.
2. Please make sure all PRs pass the test suite.
3. Keep it clean and follow our `.github/PULL_REQUEST_TEMPLATE.md`.

## 📜 License
Released under the MIT License. Developed and maintained with ❤️ by [sayan-stack](https://github.com/sayan-stack).
