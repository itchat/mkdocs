// KaTeX 按需加载：只有页面里真的有公式（arithmatex 生成的 .arithmatex 元素）
// 才去下载 KaTeX 的 CSS 和 JS，其余页面完全不加载。
(() => {
  const BASE = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/";
  let ready = null;

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

  const loadKatex = () => {
    if (!ready) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = BASE + "katex.min.css";
      document.head.appendChild(css);
      ready = loadScript(BASE + "katex.min.js");
    }
    return ready;
  };

  document$.subscribe(({ body }) => {
    const nodes = body.querySelectorAll(".arithmatex");
    if (nodes.length === 0) return;
    loadKatex().then(() => {
      nodes.forEach((el) => {
        const text = el.textContent.trim();
        const display = text.startsWith("\\[");
        const tex = text.replace(/^\\[\[(]/, "").replace(/\\[\])]$/, "");
        katex.render(tex, el, { displayMode: display, throwOnError: false, strict: false });
      });
    });
  });
})();
