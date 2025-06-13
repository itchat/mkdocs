// 优化的 KaTeX 渲染器 - 懒加载和性能优化
document$.subscribe(({ body }) => {
  // 检查页面是否包含数学公式
  const mathElements = body.querySelectorAll('script[type="math/tex"], .arithmatex, [data-math]');
  const hasInlineMath = body.textContent.includes('$') || body.textContent.includes('\\(');
  const hasDisplayMath = body.textContent.includes('$$') || body.textContent.includes('\\[');
  
  // 只在有数学公式的页面加载 KaTeX
  if (mathElements.length > 0 || hasInlineMath || hasDisplayMath) {
    // 使用 requestIdleCallback 在浏览器空闲时渲染
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        renderMathInElement(body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false, // 避免公式错误阻塞页面
          strict: false
        });
      });
    } else {
      // 降级方案
      setTimeout(() => {
        renderMathInElement(body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false,
          strict: false
        });
      }, 100);
    }
  }
})
