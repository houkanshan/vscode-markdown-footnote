import * as vscode from 'vscode';
import { footnoteRefRegex, matchAll } from '../utils';
type InsertFootnoteArgs = { footnoteName: string };

function nextLine(position: vscode.Position) {
  return new vscode.Position(position.line + 1, 0);
}

export default async function insertFootnote({ footnoteName } = {} as InsertFootnoteArgs) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  let text: string;
  const shouldInsertFootnoteRef = !footnoteName;

  if (shouldInsertFootnoteRef) {
    const refMatches = matchAll(footnoteRefRegex, editor.document.getText());
    footnoteName =
      (await vscode.window.showInputBox({
        prompt: 'Footnote name (no space or tab)',
        placeHolder: 'Footnote name',
        value: '' + (refMatches.length + 1),
      })) || '';
  }

  footnoteName = footnoteName.replace(/\s/g, '');

  editor.edit((edit) => {
    if (shouldInsertFootnoteRef) {
      edit.insert(editor.selection.start, `[^${footnoteName}]`);
    }

    text = editor.document.getText();
    const emptyLinesAbove = text.slice(-1) === '\n' ? '\n' : '\n\n';
    const endPosition = editor.document.positionAt(text.length);
    edit.insert(endPosition, `${emptyLinesAbove}[^${footnoteName}]: `);
    const newEndPosition = editor.document.positionAt(editor.document.getText().length);

    editor.selection = new vscode.Selection(newEndPosition, newEndPosition); // set cursor
    editor.revealRange(new vscode.Range(newEndPosition, nextLine(newEndPosition))); // scroll to
  });
}
