import * as vscode from 'vscode';
import { buildPeekCommandUri } from '../commands/peek';
import { footnoteRefRegex, footnoteContentRegex, buildFootnoteContentRegex } from '../utils';
import createRangeFromFootnoteMatch from '../utils/createRangeFromFootnoteMatch';

// Provide hover tips:
// - on a footnote ref showing the footnote content and a link for peek definition
// - on a footnote content showing a link for peek references
export default class FootnoteHoverProvider implements vscode.HoverProvider {
  public provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const footnoteRefHover = this.footnoteRefHoverProvider(document, position);
    if (footnoteRefHover) {
      return footnoteRefHover;
    }

    const footnoteContentHover = this.footnoteContentHoverProvider(document, position);
    if (footnoteContentHover) {
      return footnoteContentHover;
    }

    return null;
  }

  private footnoteRefHoverProvider(document: vscode.TextDocument, position: vscode.Position) {
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

    const peekUri = buildPeekCommandUri(range.start, 'definition');
    const peekAlt = 'Open a peek editor for quick viewing and editing';
    const content = `${match.groups!.content}\n\n[Peek](${peekUri} "${peekAlt}")`;

    return new vscode.Hover(wrapMarkdownString(content), range);
  }

  private footnoteContentHoverProvider(document: vscode.TextDocument, position: vscode.Position) {
    const range = document.getWordRangeAtPosition(position, footnoteContentRegex);
    if (!range) {
      return null;
    }

    const peekUri = buildPeekCommandUri(range.start, 'references');
    const peekAlt = 'Open a peek editor for quick viewing and editing';
    const content = `[Peek](${peekUri} "${peekAlt}")`;

    return new vscode.Hover(wrapMarkdownString(content), range);
  }
}

function wrapMarkdownString(content: string) {
  var mdStr = new vscode.MarkdownString(content);
  mdStr.isTrusted = true;
  return mdStr;
}
