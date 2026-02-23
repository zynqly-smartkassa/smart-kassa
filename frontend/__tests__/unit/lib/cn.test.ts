/** Tests for src/lib/utils.ts – the cn() class-name helper. */

import { describe, it, expect } from 'vitest';
import { cn } from '../../../src/lib/utils';

describe('cn()', () => {
  it('joins two class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('ignores false, null and undefined', () => {
    expect(cn('a', false, null, undefined)).toBe('a');
  });

  it('returns an empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('resolves Tailwind conflicts – the last utility wins', () => {
    // twMerge should keep only the last padding utility
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('supports object syntax from clsx', () => {
    expect(cn({ active: true, hidden: false })).toBe('active');
  });

  it('supports array syntax from clsx', () => {
    expect(cn(['x', 'y'])).toBe('x y');
  });

  it('merges multiple groups of utilities correctly', () => {
    expect(cn('text-sm font-bold', 'text-lg')).toBe('font-bold text-lg');
  });
});
