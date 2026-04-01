// src/index.ts
function extractJson(text) {
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/g;
  let match;
  while ((match = jsonBlockRegex.exec(text)) !== null) {
    try {
      return JSON.parse(match[1]);
    } catch {
    }
  }
  const startObj = text.indexOf("{");
  const startArr = text.indexOf("[");
  if (startObj === -1 && startArr === -1) return null;
  const start = startObj !== -1 && startArr !== -1 ? Math.min(startObj, startArr) : Math.max(startObj, startArr);
  const endChar = text[start] === "{" ? "}" : "]";
  const end = text.lastIndexOf(endChar);
  if (start !== -1 && end !== -1 && start < end) {
    const possibleJson = text.substring(start, end + 1);
    try {
      return JSON.parse(possibleJson);
    } catch {
      return null;
    }
  }
  return null;
}
function extractCodeBlock(text, language) {
  const blocks = extractAllCodeBlocks(text);
  if (language) {
    const match = blocks.find((b) => b.language.toLowerCase() === language.toLowerCase());
    return match ? match.code : null;
  }
  return blocks.length > 0 ? blocks[0].code : null;
}
function extractAllCodeBlocks(text) {
  const blockRegex = /```([a-zA-Z0-9_+\-]*)\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  while ((match = blockRegex.exec(text)) !== null) {
    blocks.push({
      language: match[1]?.trim() || "",
      code: match[2]?.trim() || ""
    });
  }
  return blocks;
}
export {
  extractAllCodeBlocks,
  extractCodeBlock,
  extractJson
};
//# sourceMappingURL=index.mjs.map