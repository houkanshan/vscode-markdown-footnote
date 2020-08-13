import * as vscode from 'vscode';
export default function createRangeFromFootnoteMatch(
  document: vscode.TextDocument,
  match: RegExpMatchArray,
): vscode.Range {
  const offset = match.index || 0;
  const linkStart = document.positionAt(offset);
  const linkEnd = document.positionAt(offset + match[1].length + 3);
  return new vscode.Range(linkStart, linkEnd);
}
