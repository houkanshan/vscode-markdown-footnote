import * as vscode from 'vscode';
import { Position } from 'vscode';
import { internalGotoLineColumn } from './gotoLineColumn';

export type PeekType = 'definition' | 'references';
type SimplePosition = { line: number; column: number };
export type PeekArgs = {
  startPosition: SimplePosition;
  peekType: PeekType;
};

export default function peek({ startPosition, peekType } = {} as PeekArgs) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    internalGotoLineColumn(editor, startPosition);
    switch (peekType) {
      case 'definition':
        vscode.commands.executeCommand('editor.action.peekDefinition');
        break;
      case 'references':
        vscode.commands.executeCommand('editor.action.referenceSearch.trigger');
    }
  }
}

export function buildPeekCommandUri(startPosition: Position, peekType = 'definition' as PeekType) {
  const peekUri = vscode.Uri.parse('command:_vscode-markdown-footnote.peek').with({
    query: JSON.stringify({
      startPosition: positionToSimplePosition(startPosition),
      peekType,
    }),
  });
  return peekUri;
}

function positionToSimplePosition(pos: Position) {
  return {
    line: pos.line,
    column: pos.character,
  };
}

function simplePositionToPosition(simplePos: SimplePosition) {
  return new Position(simplePos.line, simplePos.column);
}
