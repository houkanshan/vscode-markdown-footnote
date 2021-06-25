import vscode from 'vscode';
import { footnoteContentRegex, buildFootnoteRefRegex } from '../utils';
import createRangeFromFootnoteMatch from '../utils/createRangeFromFootnoteMatch';

export default class FootnoteReferenceProvider implements vscode.ReferenceProvider {
  provideReferences(document: vscode.TextDocument, position: vscode.Position, context: vscode.ReferenceContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Location[]> {
    const range = document.getWordRangeAtPosition(position, footnoteContentRegex);
    console.log(range);
    if (!range) {
      return null;
    }

    const footnoteContentHead = document.getText(range);
    const footnoteName = footnoteContentHead.slice(2, footnoteContentHead.length - 1);

    const keyRegex = buildFootnoteRefRegex(footnoteName);
    const matches = document.getText().matchAll(keyRegex);

    const locations = [] as vscode.Location[];
    for (const match of matches) {
      locations.push(new vscode.Location(document.uri, createRangeFromFootnoteMatch(document, match)));
    }
    return locations;
  }
}
