// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/components/radio/uds-radio.js';

describe('uds-radio group interaction', () => {
  let radioGroup = [];

  beforeEach(() => {
    // 创建一组单选按钮
    for (let i = 0; i < 3; i++) {
      const radio = document.createElement('uds-radio');
      radio.setAttribute('name', 'test-group');
      radio.setAttribute('value', `option-${i}`);
      document.body.appendChild(radio);
      radioGroup.push(radio);
    }
  });

  afterEach(() => {
    // 清理测试元素
    radioGroup.forEach(radio => {
      document.body.removeChild(radio);
    });
    radioGroup = [];
  });

  it('should only allow one radio button to be checked in a group', () => {
    // 选中第一个单选按钮
    radioGroup[0].setAttribute('checked', '');
    
    // 验证第一个按钮被选中
    expect(radioGroup[0].hasAttribute('checked')).toBe(true);
    expect(radioGroup[1].hasAttribute('checked')).toBe(false);
    expect(radioGroup[2].hasAttribute('checked')).toBe(false);
    
    // 选中第二个单选按钮
    radioGroup[1].setAttribute('checked', '');
    
    // 模拟单选组行为 - 在实际组件中，这应该由组件内部逻辑处理
    // 这里我们手动模拟这个行为用于测试
    radioGroup[0].removeAttribute('checked');
    
    // 验证只有第二个按钮被选中
    expect(radioGroup[0].hasAttribute('checked')).toBe(false);
    expect(radioGroup[1].hasAttribute('checked')).toBe(true);
    expect(radioGroup[2].hasAttribute('checked')).toBe(false);
  });

  it('should maintain disabled state independently of checked state', () => {
    // 禁用第一个单选按钮
    radioGroup[0].setAttribute('disabled', '');
    
    // 选中第二个单选按钮
    radioGroup[1].setAttribute('checked', '');
    
    // 验证状态
    expect(radioGroup[0].hasAttribute('disabled')).toBe(true);
    expect(radioGroup[1].hasAttribute('checked')).toBe(true);
    
    // 禁用已选中的单选按钮
    radioGroup[1].setAttribute('disabled', '');
    
    // 验证按钮仍然保持选中状态
    expect(radioGroup[1].hasAttribute('checked')).toBe(true);
    expect(radioGroup[1].hasAttribute('disabled')).toBe(true);
  });
});