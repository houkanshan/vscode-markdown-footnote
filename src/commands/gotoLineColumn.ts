import * as vscode from 'vscode';
import { Position } from 'vscode';

export type GotoLineColumnArgs = { line: number; column: number };

export default function gotoLineColumn(arg: GotoLineColumnArgs) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    internalGotoLineColumn(editor, arg);
  }
}

export function internalGotoLineColumn(
  editor: vscode.TextEditor,
  { line, column }: GotoLineColumnArgs,
) {
  const position = new Position(line, column);
  const range = new vscode.Range(position, new Position(line, column + 1));
  editor.selection = new vscode.Selection(range.start, range.end);
  editor.revealRange(range);
}
