# 5.1 Exam QAs

## Exam Review

### 2024 Mock Exam Q4

```java
function foo(n) {
    let x = 0;
    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i] >= n) {
            x += 1;
        }
    }
    return (y) => "It's " + "bu".repeat(x + y) + "bble tea!";
}

let f = foo(0);
alert(f);          // Message A: 输出箭头函数代码
alert(f(1));       // Message B: It's bubble tea!

let g = foo(2, 1, 0, 1);
alert(g(0));       // Message C: It's bble tea!

let h = foo(2, 1, 3, 3, 1);
alert(h(1));       // Message D: It's bubububble tea!
alert(h(0, 2));    // Message E: It's bububble tea!
```

- 2024 年 Exam 第四题考题，五个打印出来的内容是啥

  `foo(0)` 会返回一个匿名函数 `"It's " + "bu".repeat(x + y) + "bble tea!";`

  但是并没有打印出来而是用 `alret`，这个函数会直接把括号里所有东西直接搞出来

  ```js
  (y) => "It's " + "bu".repeat(x+y) + "bble tea!" // Message A
  f(1) // 这里等于在说 y = 1，而由于 x = 0 // Message B: It's bubble tea!
  foo(2, 1, 0, 1) // 这里 arguments 长度为 4，n 为 2, 由于 x 和 y 都是 0 因此 // Message C: It's bble tea!
  foo(2, 1, 3, 3, 1); // 有两个三，x = 2, y =1 // Message D: It's bubububble tea!
  h(0, 2) // x = 2, y = 0 所以 // Message E: It's bububble tea!
  ```

### LO

- *Purpose of JavaScript*

  **增强 HTML 和 CSS**，为网站添加**交互性**和**动态功能**。它允许开发者创建更加丰富和响应迅速的用户体验。

- *How JavaScript can be used in the browser*

  **操作 HTML 内容和结构 (DOM 操作)**：动态地添加、删除或修改页面的元素和内容。

  **响应用户事件**：例如点击鼠标、按下键盘、表单提交等。

  **数据验证**：在数据发送到服务器之前，在客户端验证用户输入。

  **异步通信 (AJAX)**：在不重新加载整个页面的情况下与服务器交换数据。

  **创建动画和视觉效果**。

  **存储和检索浏览器中的信息 (Cookies, Local Storage)**。

- *All of the language features covered in the lecture.*

  **变量 (Variables)**：用于存储数据 (例如 `let`, `const`, `var`)。

  **数据类型 (Data Types)**：例如字符串 (Strings)、数字 (Numbers)、布尔值 (Booleans)、数组 (Arrays)、对象 (Objects)。

  **运算符 (Operators)**：算术运算符、比较运算符、逻辑运算符等。

  **控制流语句 (Control Flow)**：

  - **条件语句 (Conditional Statements)**：`if...else`，`switch`。
  - **循环语句 (Loops)**：`for`，`while`，`do...while`。

  **函数 (Functions)**：用于封装可重用的代码块。

  **作用域 (Scope)**：变量的可访问性。

  **事件处理 (Event Handling)**：响应用户交互。

  **DOM 操作基础 (Basic DOM Manipulation)**：选择和修改 HTML 元素。
