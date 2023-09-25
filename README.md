<p align="center" style="margin: 0">
  <a href="https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote" ><img src="./assets/markdown-footnote.png" alt="VSCode Markdown Footnote" width="80" /></a>
</p>
<h1 align="center" style="margin-top: 0">VSCode Markdown Footnote</h1>

[![](https://vsmarketplacebadge.apphb.com/version-short/houkanshan.vscode-markdown-footnote.svg)](https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote)
[![](https://vsmarketplacebadge.apphb.com/installs/houkanshan.vscode-markdown-footnote.svg)](https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote)
[![](https://vsmarketplacebadge.apphb.com/rating-short/houkanshan.vscode-markdown-footnote.svg)](https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote&ssr=false#review-details)
[![](https://github.com/houkanshan/vscode-markdown-footnote/workflows/CI/badge.svg?branch=master)](https://github.com/houkanshan/vscode-markdown-footnote/actions?query=workflow%3ACI+branch%3Amaster)

`[^1]` [footnote syntax](https://www.markdownguide.org/extended-syntax/#footnotes) support to VS Code's Markdown editor and preview.

## Features

- Hover to preview and jump between footnote reference and content by <kbd>cmd</kbd> / <kbd>ctrl</kbd> + <kbd>click</kbd>.

![Hover preview](assets/hover.png)

- Peek editor for quick editing and preview.

![Peek footnote content](assets/peek-content.png)

![Peek footnote references](assets/peek-references.png)

- Command for inserting new footnote

![Click to create a new footnote](assets/click-to-create.png)

![Use command to insert a footnote](assets/command-to-insert.png)

- Render footnotes in the built-in markdown preview.

![Preview](assets/preview.png)

- Rename footnotes directly in the editor.

### TODO

- Support multiline footnote content.
- Support `pandoc-citeproc` format [citations](https://crsh.github.io/papaja_man/writing.html#citations)

## Contributing

- File bugs, feature requests in [GitHub Issues](https://github.com/houkanshan/vscode-markdown-footnote/issues).
- Leave a review on [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote&ssr=false#review-details).

### Dev

- Fork this repository
- `npm install`
- Create your feature branch: `git checkout -b my-new-feature`
- Make changes and add tests
- `npm test:watch` and check your changes by pressing `F5`
- Commit your changes: `git commit -am 'feat: Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

## Thanks

- [Markdown Footnotes](https://github.com/mjbvz/vscode-markdown-footnotes)
- [Markdown Memo](https://github.com/svsool/vscode-memo)

## Changelog

- 20230925 新增脚注修改功能
See changelog [here](./CHANGELOG.md).
