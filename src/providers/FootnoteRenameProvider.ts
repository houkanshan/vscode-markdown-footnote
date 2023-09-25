import * as vscode from 'vscode';
import createRangeFromFootnoteMatch from '../utils/createRangeFromFootnoteMatch';
import createUriForRange from '../utils/createUriForRange';
import createRefContentPairs from '../utils/createRefContentPairs';
import {
  matchAll,
  footnoteRefRegex,
  footnoteContentRegex,
  buildFootnoteContentRegex,
  buildFootnoteRefRegex,
} from '../utils';

const openingBracketsLength = 2;

export default class FootnoteRenameProvider implements vscode.RenameProvider {
  public async prepareRename(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): Promise<vscode.Range | null> {
    const range =
      document.getWordRangeAtPosition(position, footnoteRefRegex) ||
      document.getWordRangeAtPosition(position, footnoteContentRegex);
    if (range) {
      const footnoteRefText = document.getText(range);
      const footnoteName = footnoteRefText.slice(2, -1); // 使用负数索引去除开头和结尾的字符
      const refRange = new vscode.Range(
        range.start.translate(0, openingBracketsLength), // 使用 translate 方法简化位置计算
        range.start.translate(0, openingBracketsLength + footnoteName.length),
      );

      return refRange;
    }

    return null;
  }

  public async provideRenameEdits(
    document: vscode.TextDocument,
    position: vscode.Position,
    newName: string,
  ): Promise<vscode.WorkspaceEdit | null> {
    const range =
      document.getWordRangeAtPosition(position, footnoteRefRegex) ||
      document.getWordRangeAtPosition(position, footnoteContentRegex);
    if (!range) {
      return null;
    }
    const footnoteRefText = document.getText(range);
    const footnoteName = footnoteRefText.slice(2, footnoteRefText.length - 1);
    const refRegex = buildFootnoteRefRegex(footnoteName);
    const contentRegexsource = buildFootnoteContentRegex(footnoteName);
    const contentRegex = new RegExp(contentRegexsource.source, 'mg');
    const text = document.getText();

    let match;

    const workspaceEdit = new vscode.WorkspaceEdit();

    while ((match = refRegex.exec(text))) {
      const footnoteRef = match[0]; // 获取匹配到的脚注引用

      // 获取匹配的范围
      const range = new vscode.Range(
        document.positionAt(match.index),
        document.positionAt(match.index + footnoteRef.length),
      );

      // 将匹配的脚注引用替换为新的脚注引用
      workspaceEdit.replace(document.uri, range, `[^${newName}]`);
    }

    while ((match = contentRegex.exec(text))) {
      const footnoteRef = match[1]; // 获取匹配到的脚注引用

      // 获取匹配的范围
      const range = new vscode.Range(
        document.positionAt(match.index),
        document.positionAt(match.index + footnoteRef.length + 3),
      );
      workspaceEdit.replace(document.uri, range, `[^${newName}]`);
    }
    return workspaceEdit;
  }
}
