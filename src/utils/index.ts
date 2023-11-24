export const escapeForRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const footnoteRefRegex = /\[\^(?<key>\S+?)\](?!\:)/g;
export const footnoteContentRegex = /^\[\^(?<key>\S+?)\](?=\:( +|$))/gm;

export function buildFootnoteContentRegex(name: string) {
  return new RegExp(`^\\[\\^(?<key>${escapeForRegExp(name)})\\]\\: +(?<content>.*)$`, 'm');
}

export function buildFootnoteRefRegex(name: string) {
  return new RegExp(`\\[\\^(?<key>${escapeForRegExp(name)})\\](?!\\:)`, 'mg');
}

export function matchAll(pattern: RegExp, text: string): Array<RegExpMatchArray> {
  const out: RegExpMatchArray[] = [];
  pattern.lastIndex = 0;
  let match: RegExpMatchArray | null;
  while ((match = pattern.exec(text))) {
    out.push(match);
  }
  return out;
}
