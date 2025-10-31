// @ts-nocheck
// 抽屉功能
document.addEventListener('DOMContentLoaded', function() {
  const drawerToggle = document.getElementById('drawer-toggle');
  const drawer = document.getElementById('drawer');
  const drawerClose = document.querySelector('.drawer-close');
  
  // 确保所有元素都存在
  if (!drawerToggle || !drawer || !drawerClose) {
    console.warn('抽屉组件的某些元素不存在，抽屉功能可能无法正常工作');
    return;
  }
  
  // 打开抽屉
  drawerToggle.addEventListener('click', function() {
    drawer.classList.add('open');
  });
  
  // 关闭抽屉
  drawerClose.addEventListener('click', function() {
    drawer.classList.remove('open');
  });
  
  // 点击抽屉外部关闭抽屉
  document.addEventListener('click', function(event) {
    // 确保 event.target 是 Node 类型
    if (event.target instanceof Node && !drawer.contains(event.target) && event.target !== drawerToggle) {
      drawer.classList.remove('open');
    }
  });
  
  // 按钮配置交互逻辑
  // 获取所有控件和预览区域
  const buttonType = document.getElementById('button-type');
  const buttonStyle = document.getElementById('button-style');
  const buttonSize = document.getElementById('button-size');
  const buttonDisplay = document.querySelector('.button-display');
  
  // 确保所有元素都存在
  if (buttonType && buttonStyle && buttonSize && buttonDisplay) {
    
    // 添加CSS样式到head
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    
    // 更新按钮函数
    function updateButton() {
      // 获取当前选择的值
      const type = buttonType.value;
      const style = buttonStyle.value || 'filled';
      const size = buttonSize.value || 'md';
      console.log(type, style, size);
      
      // 构建模板ID (确保使用正确的大小标识符)
      let sizeId = size;
      if (size === 'lg') sizeId = 'large';
      
      const templateId = `${type}-${style}-${sizeId}`;
      console.log(templateId);
      
      // 隐藏所有按钮模板
      const allTemplates = document.querySelectorAll('.button-template');
      allTemplates.forEach(template => {
        template.style.display = 'none';
      });
      
      // 获取对应的模板
      const template = document.getElementById(templateId);

      console.log('template', template)
      
      // 如果找到模板，显示它
      if (template) {
        template.style.display = 'block';
      } else {
        console.warn(`未找到模板: ${templateId}`);
        // 使用默认按钮
        const defaultTemplate = document.getElementById('primary-filled-md');
        if (defaultTemplate) {
          defaultTemplate.style.display = 'block';
        }
      }
    }
    
    // 初始更新
    updateButton();
    
    // 添加事件监听器
    buttonType.addEventListener('change', updateButton);
    buttonStyle.addEventListener('change', updateButton);
    buttonSize.addEventListener('change', updateButton);
  }
});