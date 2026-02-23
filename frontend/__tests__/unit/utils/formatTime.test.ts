/** Tests for formatTime() – converts total seconds to a zero-padded "HH:MM:SS" string. */

import { describe, it, expect } from 'vitest';
import { formatTime } from '../../../src/utils/rides/formatTime';

describe('formatTime()', () => {
  // covers zero, unit boundaries (s/min/h), multi-digit hours, and mixed values
  it.each([
    [0,         '00:00:00'],
    [1,         '00:00:01'],
    [59,        '00:00:59'],
    [60,        '00:01:00'],
    [61,        '00:01:01'],
    [3599,      '00:59:59'],
    [3600,      '01:00:00'],
    [3661,      '01:01:01'],
    [36000,     '10:00:00'],
    [45296,     '12:34:56'], // 12*3600 + 34*60 + 56
    [99 * 3600, '99:00:00'],
  ] as const)('converts %i s → "%s"', (input, expected) => {
    expect(formatTime(input)).toBe(expected);
  });

  // both minute and second parts must be zero-padded when below 10
  it('zero-pads single-digit segments', () => {
    const result = formatTime(60 * 5 + 7); // 00:05:07
    expect(result.split(':')[1]).toBe('05');
    expect(result.split(':')[2]).toBe('07');
  });
});
