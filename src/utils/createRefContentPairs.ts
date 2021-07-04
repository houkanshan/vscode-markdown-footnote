import * as vscode from 'vscode';
import { matchAll, footnoteContentRegex, footnoteRefRegex } from '../utils';

export default function createRefContentPairs(document: vscode.TextDocument) {
  const text = document.getText();
  const refMatches = matchAll(footnoteRefRegex, text);
  const contentMatches = matchAll(footnoteContentRegex, text);

  // Generate contentMatchesMap
  const contentMatchesMap = {} as Record<string, RegExpMatchArray>;
  for (const contentMatch of contentMatches) {
    const key = contentMatch.groups!.key;
    if (!contentMatchesMap[key]) { // Only find the first footnote content.
      contentMatchesMap[key] = contentMatch;
    }
  }

  // Generate refContentPairs with contentMatchesMap
  const refContentPairs = [] as RefContentMatchPair[];
  for (let refMatch of refMatches) {
    const key = refMatch.groups!.key;
    refContentPairs.push([refMatch, contentMatchesMap[key] || null]);
  }

  return refContentPairs;
}
