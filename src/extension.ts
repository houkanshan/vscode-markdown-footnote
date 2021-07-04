import * as vscode from 'vscode';
import insertFootnote from './commands/insertFootnote';
import gotoLineColumn from './commands/gotoLineColumn';
import FootnoteLinkProvider from './providers/FootnoteLinkProvider';
import FootnoteHoverProvider from './providers/FootnoteHoverProvider';
import FootnoteReferenceProvider from './providers/FootnoteReferenceProvider';
import FootnoteDefinitionProvider from './providers/FootnoteDefinitionProvider';
import peek from './commands/peek';
// import FootnoteDeclarationProvider from './providers/FootnoteDeclarationProvider';

const mdLangSelector = { language: 'markdown' };

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('_vscode-markdown-footnote.gotoLineColumn', gotoLineColumn),
    vscode.commands.registerCommand('_vscode-markdown-footnote.peek', peek),
    vscode.commands.registerCommand('vscode-markdown-footnote.insertFootnote', insertFootnote),
    vscode.languages.registerHoverProvider(mdLangSelector, new FootnoteHoverProvider()),
    vscode.languages.registerDocumentLinkProvider(mdLangSelector, new FootnoteLinkProvider()),
    vscode.languages.registerDefinitionProvider(mdLangSelector, new FootnoteDefinitionProvider()),
    vscode.languages.registerReferenceProvider(mdLangSelector, new FootnoteReferenceProvider()),

    // NOTE: Not sure what's the difference between declaration and definition.
    // vscode.languages.registerDeclarationProvider(mdLangSelector, new FootnoteDeclarationProvider()),
  );

  return {
    extendMarkdownIt(md: any) {
      return md.use(require('markdown-it-footnote'));
    },
  };
}

export function deactivate() {}
