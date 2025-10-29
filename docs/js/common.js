/**
 * Universal Design System - 共用JS函数
 * 包含代码展开收起和暗黑模式适配功能
 */

// 暗黑模式适配功能
(function initTheme() {
  try {
    // 尝试从localStorage获取主题
    const storedTheme = localStorage.getItem('uds-theme');
    if (storedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // 检查URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if (themeParam === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {
    console.error('Theme initialization error:', e);
  }
})();

// 主题切换功能
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? '' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  
  try {
    localStorage.setItem('uds-theme', newTheme);
  } catch (e) {
    console.error('Theme storage error:', e);
  }
}

// 代码展开收起功能
function initCodeBlocks() {
  // 为所有代码块添加展开/隐藏按钮
  const codeBlocks = document.querySelectorAll('.code-block');
  codeBlocks.forEach((codeBlock, index) => {
    // 创建代码块头部
    const header = document.createElement('div');
    header.className = 'code-block-header';
    header.innerHTML = '<span>示例代码</span>';
    
    // 创建展开/隐藏按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'code-toggle-btn';
    toggleBtn.innerHTML = '显示代码 <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'code-block-' + index);
    
    // 添加按钮点击事件
    toggleBtn.addEventListener('click', function() {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      
      if (expanded) {
        // 隐藏代码块
        if (codeBlock instanceof HTMLElement) {
          codeBlock.style.display = 'none';
        }
        toggleBtn.innerHTML = '显示代码 <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        toggleBtn.classList.remove('expanded');
      } else {
        // 显示代码块
        if (codeBlock instanceof HTMLElement) {
          codeBlock.style.display = 'block';
        }
        toggleBtn.innerHTML = '隐藏代码 <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        toggleBtn.classList.add('expanded');
      }
    });
    
    // 将按钮添加到头部
    header.appendChild(toggleBtn);
    
    // 将头部插入到代码块前面
    if (codeBlock.parentNode) {
      codeBlock.parentNode.insertBefore(header, codeBlock);
    }
    
    // 设置代码块ID
    codeBlock.id = 'code-block-' + index;
  });
}

// 页面加载完成后初始化代码块
document.addEventListener('DOMContentLoaded', function() {
  initCodeBlocks();
});