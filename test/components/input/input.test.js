// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/components/input/uds-input.js';

describe('uds-input', () => {
  let input;

  beforeEach(() => {
    input = document.createElement('uds-input');
    document.body.appendChild(input);
  });

  afterEach(() => {
    document.body.removeChild(input);
  });

  it('should render with default attributes', () => {
    expect(input).toBeDefined();
    expect(input.getAttribute('type')).toBe(null);
    expect(input.getAttribute('placeholder')).toBe(null);
    expect(input.getAttribute('disabled')).toBe(null);
  });

  it('should update type attribute correctly', () => {
    input.setAttribute('type', 'text');
    expect(input.getAttribute('type')).toBe('text');
    
    input.setAttribute('type', 'password');
    expect(input.getAttribute('type')).toBe('password');
    
    input.setAttribute('type', 'email');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('should update placeholder attribute correctly', () => {
    const placeholder = 'Enter text here';
    input.setAttribute('placeholder', placeholder);
    expect(input.getAttribute('placeholder')).toBe(placeholder);
  });

  it('should handle disabled state correctly', () => {
    input.setAttribute('disabled', '');
    expect(input.hasAttribute('disabled')).toBe(true);
    
    input.removeAttribute('disabled');
    expect(input.hasAttribute('disabled')).toBe(false);
  });
});