<p align="center" style="margin: 0">
  <a href="https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote" ><img src="./assets/markdown-footnote.png" alt="VSCode Markdown Footnote" width="80" /></a>
</p>
<h1 align="center" style="margin-top: 0">VSCode Markdown Footnote</h1>

[![](https://vsmarketplacebadge.apphb.com/version-short/houkanshan.vscode-markdown-footnote.svg)](https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote)
[![](https://vsmarketplacebadge.apphb.com/installs/houkanshan.vscode-markdown-footnote.svg)](https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote)
[![](https://vsmarketplacebadge.apphb.com/rating-short/houkanshan.vscode-markdown-footnote.svg)](https://marketplace.visualstudio.com/items?itemName=houkanshan.vscode-markdown-footnote&ssr=false#review-details)
[![](https://github.com/houkanshan/vscode-markdown-footnote/workflows/CI/badge.svg?branch=master)](https://github.com/houkanshan/vscode-markdown-footnote/actions?query=workflow%3ACI+branch%3Amaster)

`[^1]` [footnote syntax](https://www.markdownguide.org/extended-syntax/#footnotes) support to VS Code's Markdown editor and preview.

## 功能

- 通过 <kbd>cmd</kbd> / <kbd>ctrl</kbd> + <kbd>click</kbd> 可以悬停以预览并在脚注引用和内容之间跳转。

![悬停预览](assets/hover.png)

- 提供编辑和预览的 Peek 编辑器功能。

![查看脚注内容](assets/peek-content.png)

![查看脚注引用](assets/peek-references.png)

- 提供插入新脚注的命令。

![点击创建新脚注](assets/click-to-create.png)

![使用命令插入脚注](assets/command-to-insert.png)

- 在内置的 Markdown 预览中呈现脚注。

![预览](assets/preview.png)

- 直接在编辑器中重命名脚注。

![重命名脚注](assets/rename.png)

### 待办事项

- 支持多行脚注内容。
- 支持 `pandoc-citeproc` 格式的 [引用](https://crsh.github.io/papaja_man/writing.html#citations)
