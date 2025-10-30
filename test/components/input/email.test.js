// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/components/input/uds-input.js';

describe('uds-input email type', () => {
  let input;

  beforeEach(() => {
    input = document.createElement('uds-input');
    input.setAttribute('type', 'email');
    document.body.appendChild(input);
  });

  afterEach(() => {
    document.body.removeChild(input);
  });

  it('should render with email type', () => {
    expect(input).toBeDefined();
    expect(input.getAttribute('type')).toBe('email');
  });

  it('should have email type', () => {
    // 验证输入框类型为email
    expect(input.getAttribute('type')).toBe('email');
  });
});