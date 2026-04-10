# 首页的中英文原理

● 通过 CSS + 一行 JS 实现的：

  1. HTML 中用 lang 属性标记双语内容

  <h1 lang="zh">网页内容，一键变思维导图</h1>
  <h1 lang="en">Webpages to Mind Maps, Instantly</h1>

  2. CSS 默认隐藏英文，显示中文

  [lang="en"] { display: none; }          /* 默认隐藏英文 */
  body.en [lang="zh"] { display: none; }  /* 切换时隐藏中文 */
  body.en [lang="en"] { display: block; } /* 切换时显示英文 */

  3. JS 切换 body 的 en class

  function toggleLang() {
    document.body.classList.toggle('en');
    btn.textContent = document.body.classList.contains('en') ? '中文' : 'EN';
  }

  点击导航栏的 "EN" 按钮 → body 加上 .en class → CSS 规则翻转 → 中文隐藏，英文显示。再点 "中文" → 反过来。

  所有带 lang="zh" / lang="en" 的元素都受这个机制控制，包括标题、段落、按钮文字、图片。
