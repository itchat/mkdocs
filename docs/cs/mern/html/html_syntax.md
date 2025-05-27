# 1.0 HTML Basic Syntax 
## Shortcut

- ! 加 return 快速得到 html 前缀
- shift + 上下左右可以选择文本
- shift + option + 下，向下粘贴

## Headers

```html
<h1>hello world</h1>
```

- 这样的整体叫 element, `<h1>` 和 `</h1>` 分别为 opening 和 closing tag
- header 只有 `<h1>` -  `<h6>`

## Paragraphs

Lorem Ipsum 是一种用于排版和设计的假文，通常被用作占位符文本。其目的是在设计样本中提供一个文本填充，以便在没有实际内容的情况下模拟文本的外观和布局。这对于检查字体、排版和整体设计效果非常有用。

Lorem Ipsum 的来源可以追溯到古罗马时期的拉丁文学，特别是公元前45年左右西塞罗（Cicero）的著作《善与恶的终极理论》（"De finibus bonorum et malorum"）。虽然它是拉丁文，但 Lorem Ipsum 并没有实际意义，仅仅是一种模拟文本的工具。

现代设计和开发工具中，Lorem Ipsum 经常被用来填充文本框、文章和段落，帮助设计师和开发者专注于布局和功能，而不是内容。

[www.lipsum.co](http://www.lipsum.co) 或者自己 Google Funny Lorem Ipsum

### Void Element

```html
<hr />
<br /> 
```

以上两种 tag 分别叫 horizontal rule 和 break element，现代网页开发中 HTML 自动忽略空格和 / 符号，直接使用 `<hr>` 和 `<br>` 即可，但前者更为标准。

在 paragraph 中空行最好使用多个 `<p>` tag, 中间穿插 `<br>` 会导致盲人阅读困难
