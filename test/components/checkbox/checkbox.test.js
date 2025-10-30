// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/components/checkbox/uds-checkbox.js';

describe('uds-checkbox', () => {
  let checkbox;

  beforeEach(() => {
    checkbox = document.createElement('uds-checkbox');
    document.body.appendChild(checkbox);
  });

  afterEach(() => {
    document.body.removeChild(checkbox);
  });

  it('should render with default attributes', () => {
    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute('checked')).toBe(null);
    expect(checkbox.getAttribute('disabled')).toBe(null);
    expect(checkbox.getAttribute('size')).toBe(null);
  });

  it('should update checked attribute correctly', () => {
    checkbox.setAttribute('checked', '');
    expect(checkbox.hasAttribute('checked')).toBe(true);
    
    checkbox.removeAttribute('checked');
    expect(checkbox.hasAttribute('checked')).toBe(false);
  });

  it('should update disabled attribute correctly', () => {
    checkbox.setAttribute('disabled', '');
    expect(checkbox.hasAttribute('disabled')).toBe(true);
    
    checkbox.removeAttribute('disabled');
    expect(checkbox.hasAttribute('disabled')).toBe(false);
  });

  it('should update size attribute correctly', () => {
    checkbox.setAttribute('size', 'small');
    expect(checkbox.getAttribute('size')).toBe('small');
    
    checkbox.setAttribute('size', 'large');
    expect(checkbox.getAttribute('size')).toBe('large');
  });
});