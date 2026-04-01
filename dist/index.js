"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  extractAllCodeBlocks: () => extractAllCodeBlocks,
  extractCodeBlock: () => extractCodeBlock,
  extractJson: () => extractJson
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractAllCodeBlocks,
  extractCodeBlock,
  extractJson
});
//# sourceMappingURL=index.js.map