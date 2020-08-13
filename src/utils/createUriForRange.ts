import * as vscode from 'vscode';

export default function createUriForRange(
  document: vscode.TextDocument,
  range: vscode.Range,
): vscode.Uri {
  return vscode.Uri.parse(
    `vscode://file/${document.uri.fsPath}:${range.start.line + 1}:${range.start.character + 1}`,
  );
}
