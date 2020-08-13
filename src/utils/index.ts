import * as vscode from 'vscode';

export const escapeForRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const footnoteRefRegex = /\[\^(\S+?)\](?!\:)/g;
export const footnoteContentRegex = /^\[\^(\S+?)\](?=\: +)/gm;

export function buildFootnoteContentRegex(name: string) {
  return new RegExp(`^\\[\\^${escapeForRegExp(name)}\\]\\: +(.*)$`, 'm');
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
