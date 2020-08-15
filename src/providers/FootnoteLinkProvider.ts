import * as vscode from 'vscode';
import createRangeFromFootnoteMatch from '../utils/createRangeFromFootnoteMatch';
import createUriForRange from '../utils/createUriForRange';
import createRefContentPairs from '../utils/createRefContentPairs';

export default class FootnoteLinkProvider implements vscode.DocumentLinkProvider {
  public provideDocumentLinks(document: vscode.TextDocument): vscode.DocumentLink[] {
    const results: vscode.DocumentLink[] = [];

    const refContentPairs = createRefContentPairs(document);

    for (let [refMatch, contentMatch] of refContentPairs) {
      const refRange = createRangeFromFootnoteMatch(document, refMatch);

      if (contentMatch) {
        // Link for footnote ref
        const contentRange = createRangeFromFootnoteMatch(document, contentMatch);
        const refLink = new vscode.DocumentLink(
          refRange,
          createUriForRange(document, contentRange),
        );
        refLink.tooltip = 'Jump to content';
        results.push(refLink);

        // Link for footnote content
        const contentLink = new vscode.DocumentLink(
          contentRange,
          createUriForRange(document, refRange),
        );
        contentLink.tooltip = 'Jump up';
        results.push(contentLink);
      } else {
        const footnoteName = refMatch[1];
        const refLink = new vscode.DocumentLink(
          refRange,
          vscode.Uri.parse(
            `command:vscode-markdown-footnote.insertFootnote?${encodeURIComponent(
              JSON.stringify({ footnoteName }),
            )}`,
          ),
        );
        refLink.tooltip = 'Create footnote';
        results.push(refLink);
      }
    }

    return results;
  }
}
