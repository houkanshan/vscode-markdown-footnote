import * as vscode from 'vscode';
import { matchAll, footnoteContentRegex, footnoteRefRegex } from '../utils';

export default function createRefContentPairs(document: vscode.TextDocument) {
  const text = document.getText();
  const refMatches = matchAll(footnoteRefRegex, text);
  const contentMatches = matchAll(footnoteContentRegex, text);

  const refContentPairs = [] as RefContentMatchPair[];
  for (let refMatch of refMatches) {
    let paired = false;
    // Find paired content match
    for (let i = 0, iLen = contentMatches.length; i < iLen; i++) {
      if (refMatch[1] === contentMatches[i][1]) {
        refContentPairs.push([refMatch, contentMatches[i]]);
        contentMatches.splice(i, 1);
        paired = true;
        break;
      }
    }
    if (!paired) {
      refContentPairs.push([refMatch, null]);
    }
  }

  return refContentPairs;
}
