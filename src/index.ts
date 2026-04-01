/**
 * Extracts a JSON object or array from a potentially messy text string (e.g., from an LLM).
 */
export function extractJson<T = any>(text: string): T | null {
  // First, try to find a JSON block wrapped in markdown ```json ... ```
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/g;
  let match;
  while ((match = jsonBlockRegex.exec(text)) !== null) {
    try {
      return JSON.parse(match[1]) as T;
    } catch {
      // Continue parsing next block if this fails
    }
  }

  // Fallback: try to find anything that looks like a JSON array or object
  // Find everything between the first { or [ and the last } or ]
  const startObj = text.indexOf('{');
  const startArr = text.indexOf('[');
  
  if (startObj === -1 && startArr === -1) return null;

  const start =
    startObj !== -1 && startArr !== -1 ? Math.min(startObj, startArr) : Math.max(startObj, startArr);
  
  const endChar = text[start] === '{' ? '}' : ']';
  const end = text.lastIndexOf(endChar);

  if (start !== -1 && end !== -1 && start < end) {
    const possibleJson = text.substring(start, end + 1);
    try {
      return JSON.parse(possibleJson) as T;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Extracts the first code block from a text, optionally filtered by language.
 */
export function extractCodeBlock(text: string, language?: string): string | null {
  const blocks = extractAllCodeBlocks(text);
  if (language) {
    const match = blocks.find((b) => b.language.toLowerCase() === language.toLowerCase());
    return match ? match.code : null;
  }
  return blocks.length > 0 ? blocks[0].code : null;
}

/**
 * Extracts all markdown code blocks from a text.
 */
export function extractAllCodeBlocks(text: string): Array<{ language: string, code: string }> {
  const blockRegex = /```([a-zA-Z0-9_+\-]*)\n([\s\S]*?)```/g;
  const blocks: Array<{ language: string, code: string }> = [];
  let match;

  while ((match = blockRegex.exec(text)) !== null) {
    blocks.push({
      language: match[1]?.trim() || '',
      code: match[2]?.trim() || ''
    });
  }

  return blocks;
}
