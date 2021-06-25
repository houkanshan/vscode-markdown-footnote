import * as vscode from 'vscode';
import { Position } from 'vscode';
import { footnoteRefRegex, matchAll } from '../utils';

export type GotoLineColumnArgs = { line: number, column: number };

export default async function gotoOffset({ line, column } = {} as GotoLineColumnArgs) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const position = new Position(line, column);
    const range = new vscode.Range(position, new Position(line, column + 1));
    editor.selection = new vscode.Selection(range.start, range.end);
    editor.revealRange(range);
  }
}
