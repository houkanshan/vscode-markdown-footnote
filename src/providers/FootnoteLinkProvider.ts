import * as vscode from 'vscode';
import createRangeFromFootnoteMatch from '../utils/createRangeFromFootnoteMatch';
import createUriForRange from '../utils/createUriForRange';
import createRefContentPairs from '../utils/createRefContentPairs';

export default class FootnoteLinkProvider implements vscode.DocumentLinkProvider {
  public provideDocumentLinks(document: vscode.TextDocument): vscode.DocumentLink[] {
    const results: vscode.DocumentLink[] = [];

    // Scan document, create pairs of ref and content
    const refContentPairs = createRefContentPairs(document);

    // Iterator pairs, create documentLink for jumping or insertion
    for (let [refMatch, contentMatch] of refContentPairs) {
      const refRange = createRangeFromFootnoteMatch(document, refMatch);

      if (contentMatch) {
        // Link of ref -> content
        const contentRange = createRangeFromFootnoteMatch(document, contentMatch);
        const refLink = new vscode.DocumentLink(
          refRange,
          createUriForRange(document, contentRange),
        );
        refLink.tooltip = `${contentMatch[0]}:`;
        results.push(refLink);

        // Link of content -> ref
        // NOTE: there could be multiple links to difference ref on one content.
        const contentLink = new vscode.DocumentLink(
          contentRange,
          createUriForRange(document, refRange),
        );
        contentLink.tooltip = 'Jump up';
        results.push(contentLink);
      } else {
        // No match, a click will insert a new foot note.
        const footnoteName = refMatch.groups!.key;
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
