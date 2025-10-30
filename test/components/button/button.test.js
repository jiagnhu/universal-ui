// @ts-nocheck

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/components/button/uds-button.js';

describe('uds-button', () => {
  let button;

  beforeEach(() => {
    button = document.createElement('uds-button');
    document.body.appendChild(button);
  });

  afterEach(() => {
    document.body.removeChild(button);
  });

  it('should render with default attributes', () => {
    expect(button).toBeDefined();
    expect(button.getAttribute('type')).toBe(null);
    expect(button.getAttribute('size')).toBe(null);
    expect(button.getAttribute('disabled')).toBe(null);
  });

  it('should update type attribute correctly', () => {
    button.setAttribute('type', 'primary');
    expect(button.getAttribute('type')).toBe('primary');
    
    button.setAttribute('type', 'secondary');
    expect(button.getAttribute('type')).toBe('secondary');
  });

  it('should update size attribute correctly', () => {
    button.setAttribute('size', 'small');
    expect(button.getAttribute('size')).toBe('small');
    
    button.setAttribute('size', 'large');
    expect(button.getAttribute('size')).toBe('large');
  });

  it('should handle disabled state correctly', () => {
    button.setAttribute('disabled', '');
    expect(button.hasAttribute('disabled')).toBe(true);
    
    button.removeAttribute('disabled');
    expect(button.hasAttribute('disabled')).toBe(false);
  });
});