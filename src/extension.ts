import * as vscode from 'vscode';
import insertFootnote from './commands/insertFootnote';
import FootnoteLinkProvider from './providers/FootnoteLinkProvider';
import FootnoteHoverProvider from './providers/FootnoteHoverProvider';

const mdLangSelector = { language: 'markdown' };

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-markdown-footnote.insertFootnote', insertFootnote),
    vscode.languages.registerDocumentLinkProvider(mdLangSelector, new FootnoteLinkProvider()),
    vscode.languages.registerHoverProvider(mdLangSelector, new FootnoteHoverProvider()),
  );

  return {
    extendMarkdownIt(md: any) {
      return md.use(require('markdown-it-footnote'));
    },
  };
}

export function deactivate() {}
