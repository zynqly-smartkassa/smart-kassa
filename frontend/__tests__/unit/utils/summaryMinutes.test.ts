/** Tests for summaryMinutes.ts – durationToMinutes() and formatMinutes(). */

import { describe, it, expect } from 'vitest';
import {
  durationToMinutes,
  formatMinutes,
} from '../../../src/utils/rides/summaryMinutes';

describe('durationToMinutes()', () => {
  // covers zero, sub-minute rounding, minutes-only, hours-only, and mixed
  it.each([
    ['00:00:00', 0],
    ['00:00:29', 0],   // < 30 s rounds down
    ['00:00:30', 1],   // 30 s rounds up
    ['00:30:00', 30],
    ['01:00:00', 60],
    ['02:15:00', 135],
    ['10:00:00', 600],
    ['24:00:00', 1440],
  ] as const)('converts "%s" → %i min', (input, expected) => {
    expect(durationToMinutes(input)).toBe(expected);
  });
});

describe('formatMinutes()', () => {
  // minutes-only (<60), hours-only (exact multiples of 60), h+m combined
  it.each([
    // minutes-only
    [0,   '0 Min'],
    [1,   '1 Min'],
    [45,  '45 Min'],
    [59,  '59 Min'],
    // hours-only
    [60,  '1 Std'],
    [120, '2 Std'],
    [600, '10 Std'],
    // hours + minutes combined
    [90,  '1 Std 30 Min'],
    [135, '2 Std 15 Min'],
    [181, '3 Std 1 Min'],
  ] as const)('formats %i min → "%s"', (input, expected) => {
    expect(formatMinutes(input)).toBe(expected);
  });
});
