import * as vscode from 'vscode';
import { footnoteRefRegex, buildFootnoteContentRegex } from '../utils';
export default class FootnoteHoverProvider implements vscode.HoverProvider {
  public provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const range = document.getWordRangeAtPosition(position, footnoteRefRegex);
    if (!range) {
      return null;
    }

    const footnoteRefText = document.getText(range);
    const footnoteName = footnoteRefText.slice(2, footnoteRefText.length - 1);

    const contentRegex = buildFootnoteContentRegex(footnoteName);
    const match = document.getText().match(contentRegex);

    if (!match) {
      return null;
    }

    return new vscode.Hover(match.groups!.content, range);
  }
}
