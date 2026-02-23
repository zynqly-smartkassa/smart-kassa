/** Tests for formatTime() – converts total seconds to a zero-padded "HH:MM:SS" string. */

import { describe, it, expect } from 'vitest';
import { formatTime } from '../../../src/utils/rides/formatTime';

describe('formatTime()', () => {
  // zero / identity
  it('returns "00:00:00" for 0 seconds', () => {
    expect(formatTime(0)).toBe('00:00:00');
  });

  // single-unit values
  it('returns "00:00:01" for 1 second', () => {
    expect(formatTime(1)).toBe('00:00:01');
  });

  it('returns "00:00:59" for 59 seconds', () => {
    expect(formatTime(59)).toBe('00:00:59');
  });

  it('returns "00:01:00" for exactly 60 seconds (1 minute)', () => {
    expect(formatTime(60)).toBe('00:01:00');
  });

  it('returns "00:01:01" for 61 seconds', () => {
    expect(formatTime(61)).toBe('00:01:01');
  });

  it('returns "00:59:59" for 3599 seconds', () => {
    expect(formatTime(3599)).toBe('00:59:59');
  });

  it('returns "01:00:00" for exactly 3600 seconds (1 hour)', () => {
    expect(formatTime(3600)).toBe('01:00:00');
  });

  // multi-digit hours
  it('returns "10:00:00" for 36000 seconds (10 hours)', () => {
    expect(formatTime(36000)).toBe('10:00:00');
  });

  it('handles large values correctly – 99 hours', () => {
    expect(formatTime(99 * 3600)).toBe('99:00:00');
  });

  // mixed segments
  it('formats 3661 seconds as "01:01:01"', () => {
    expect(formatTime(3661)).toBe('01:01:01');
  });

  it('formats 7322 seconds as "02:02:02"', () => {
    expect(formatTime(7322)).toBe('02:02:02');
  });

  it('formats 45296 seconds as "12:34:56"', () => {
    // 12*3600 + 34*60 + 56 = 43200 + 2040 + 56 = 45296
    expect(formatTime(45296)).toBe('12:34:56');
  });

  // padding: single-digit values must be zero-padded
  it('zero-pads a single-digit minute', () => {
    const result = formatTime(60 * 5); // 00:05:00
    expect(result.split(':')[1]).toBe('05');
  });

  it('zero-pads a single-digit second', () => {
    const result = formatTime(7); // 00:00:07
    expect(result.split(':')[2]).toBe('07');
  });
});
