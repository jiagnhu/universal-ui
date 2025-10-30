// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/components/checkbox/uds-checkbox.js';

describe('uds-checkbox group interaction', () => {
  let checkboxGroup = [];

  beforeEach(() => {
    // 创建一组复选框
    for (let i = 0; i < 3; i++) {
      const checkbox = document.createElement('uds-checkbox');
      checkbox.setAttribute('name', 'test-group');
      checkbox.setAttribute('value', `option-${i}`);
      document.body.appendChild(checkbox);
      checkboxGroup.push(checkbox);
    }
  });

  afterEach(() => {
    // 清理测试元素
    checkboxGroup.forEach(checkbox => {
      document.body.removeChild(checkbox);
    });
    checkboxGroup = [];
  });

  it('should allow multiple checkboxes to be checked in a group', () => {
    // 选中第一个复选框
    checkboxGroup[0].setAttribute('checked', '');
    
    // 验证第一个复选框被选中
    expect(checkboxGroup[0].hasAttribute('checked')).toBe(true);
    expect(checkboxGroup[1].hasAttribute('checked')).toBe(false);
    expect(checkboxGroup[2].hasAttribute('checked')).toBe(false);
    
    // 选中第二个复选框
    checkboxGroup[1].setAttribute('checked', '');
    
    // 验证第一个和第二个复选框都被选中
    expect(checkboxGroup[0].hasAttribute('checked')).toBe(true);
    expect(checkboxGroup[1].hasAttribute('checked')).toBe(true);
    expect(checkboxGroup[2].hasAttribute('checked')).toBe(false);
    
    // 选中第三个复选框
    checkboxGroup[2].setAttribute('checked', '');
    
    // 验证所有复选框都被选中
    expect(checkboxGroup[0].hasAttribute('checked')).toBe(true);
    expect(checkboxGroup[1].hasAttribute('checked')).toBe(true);
    expect(checkboxGroup[2].hasAttribute('checked')).toBe(true);
  });

  it('should maintain independent checked states', () => {
    // 选中所有复选框
    checkboxGroup.forEach(checkbox => {
      checkbox.setAttribute('checked', '');
    });
    
    // 验证所有复选框都被选中
    checkboxGroup.forEach(checkbox => {
      expect(checkbox.hasAttribute('checked')).toBe(true);
    });
    
    // 取消选中第二个复选框
    checkboxGroup[1].removeAttribute('checked');
    
    // 验证只有第一个和第三个复选框被选中
    expect(checkboxGroup[0].hasAttribute('checked')).toBe(true);
    expect(checkboxGroup[1].hasAttribute('checked')).toBe(false);
    expect(checkboxGroup[2].hasAttribute('checked')).toBe(true);
  });
});