import { describe, it, expect } from 'vitest';
import { extractJson, extractCodeBlock, extractAllCodeBlocks } from '../src/index';

describe('extractJson', () => {
  it('extracts JSON from a markdown code block', () => {
    const input = "Here is the data:\n```json\n{\"id\": 1, \"name\": \"test\"}\n```\nHope it helps!";
    expect(extractJson(input)).toEqual({ id: 1, name: "test" });
  });

  it('extracts bare JSON mixed with text', () => {
    const input = "Response: {\n  \"success\": true\n} Thanks for asking.";
    expect(extractJson(input)).toEqual({ success: true });
  });

  it('extracts a JSON array', () => {
    const input = "My array: [1, 2, 3] done.";
    expect(extractJson(input)).toEqual([1, 2, 3]);
  });

  it('returns null for invalid JSON', () => {
    const input = "This is just a { text with brackets }";
    expect(extractJson(input)).toBeNull();
  });
});

describe('extractCodeBlock', () => {
  const input = "Here is JS:\n```js\nconst x = 1;\n```\nAnd Python:\n```python\nx = 1\n```";

  it('extracts the first block if no language provided', () => {
    expect(extractCodeBlock(input)).toBe("const x = 1;");
  });

  it('extracts specific language block', () => {
    expect(extractCodeBlock(input, "python")).toBe("x = 1");
  });

  it('returns null if language not found', () => {
    expect(extractCodeBlock(input, "rust")).toBeNull();
  });
});

describe('extractAllCodeBlocks', () => {
  it('extracts multiple blocks', () => {
    const input = "Code 1:\n```\ngeneric\n```\nCode 2:\n```ts\nlet a = 1;\n```";
    const blocks = extractAllCodeBlocks(input);
    expect(blocks.length).toBe(2);
    expect(blocks[0].language).toBe("");
    expect(blocks[0].code).toBe("generic");
    expect(blocks[1].language).toBe("ts");
    expect(blocks[1].code).toBe("let a = 1;");
  });
});
