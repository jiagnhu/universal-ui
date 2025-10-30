// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/components/radio/uds-radio.js';

describe('uds-radio', () => {
  let radio;

  beforeEach(() => {
    radio = document.createElement('uds-radio');
    document.body.appendChild(radio);
  });

  afterEach(() => {
    document.body.removeChild(radio);
  });

  it('should render with default attributes', () => {
    expect(radio).toBeDefined();
    expect(radio.getAttribute('checked')).toBe(null);
    expect(radio.getAttribute('disabled')).toBe(null);
    expect(radio.getAttribute('name')).toBe(null);
  });

  it('should update checked attribute correctly', () => {
    radio.setAttribute('checked', '');
    expect(radio.hasAttribute('checked')).toBe(true);
    
    radio.removeAttribute('checked');
    expect(radio.hasAttribute('checked')).toBe(false);
  });

  it('should update disabled attribute correctly', () => {
    radio.setAttribute('disabled', '');
    expect(radio.hasAttribute('disabled')).toBe(true);
    
    radio.removeAttribute('disabled');
    expect(radio.hasAttribute('disabled')).toBe(false);
  });

  it('should update name attribute correctly', () => {
    radio.setAttribute('name', 'test-group');
    expect(radio.getAttribute('name')).toBe('test-group');
  });
});