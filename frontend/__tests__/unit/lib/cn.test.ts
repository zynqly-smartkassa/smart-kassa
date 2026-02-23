/** Tests for src/lib/utils.ts – the cn() class-name helper. */

import { describe, it, expect } from 'vitest';
import { cn } from '../../../src/lib/utils';

describe('cn()', () => {
  // basic string joining
  it('joins two class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  // clsx strips falsy values before twMerge runs
  it('ignores false, null and undefined', () => {
    expect(cn('a', false, null, undefined)).toBe('a');
  });

  it('returns an empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  // twMerge deduplicates conflicting Tailwind classes – last one wins
  it('resolves Tailwind conflicts – the last utility wins', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  // clsx object syntax: key is included when value is true
  it('supports object syntax from clsx', () => {
    expect(cn({ active: true, hidden: false })).toBe('active');
  });

  it('supports array syntax from clsx', () => {
    expect(cn(['x', 'y'])).toBe('x y');
  });

  // conflicting text-size → only the last one survives
  it('merges multiple groups of utilities correctly', () => {
    expect(cn('text-sm font-bold', 'text-lg')).toBe('font-bold text-lg');
  });
});
