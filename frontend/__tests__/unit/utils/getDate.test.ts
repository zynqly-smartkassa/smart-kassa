/** Tests for getDate.ts – getDateNow(), getDateYesterday(), getDateFormat(). */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { getDateNow, getDateYesterday, getDateFormat } from '../../../src/utils/rides/getDate';

// Pin the system clock to a well-known moment so tests are deterministic.
const FIXED_DATE = new Date(2025, 0, 15, 8, 5, 3); // 2025-01-15 08:05:03

describe('getDateNow()', () => {
  afterEach(() => vi.useRealTimers());

  it('returns a string in "YYYY-MM-DD HH:MM:SS" format', () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);

    const result = getDateNow();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  it('returns the correct date and time for the fixed moment', () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);

    expect(getDateNow()).toBe('2025-01-15 08:05:03');
  });

  // Verify zero-padding for months/days/hours/minutes/seconds below 10
  it('zero-pads single-digit month and day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 5, 9, 7, 2)); // Jan 5

    const result = getDateNow();
    expect(result).toBe('2024-01-05 09:07:02');
  });

  it('contains exactly two separating spaces matching YYYY-MM-DD and HH:MM:SS', () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);

    const parts = getDateNow().split(' ');
    expect(parts).toHaveLength(2);

    const [datePart, timePart] = parts;
    expect(datePart.split('-')).toHaveLength(3);
    expect(timePart.split(':')).toHaveLength(3);
  });
});

describe('getDateYesterday()', () => {
  afterEach(() => vi.useRealTimers());

  it('returns a string in "YYYY-MM-DD HH:MM:SS" format', () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);

    expect(getDateYesterday()).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  it('returns a date exactly one day before getDateNow()', () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);

    const today = getDateNow().split(' ')[0];   // "2025-01-15"
    const yesterday = getDateYesterday().split(' ')[0]; // "2025-01-14"

    const todayMs = new Date(today).getTime();
    const yesterdayMs = new Date(yesterday).getTime();

    expect(todayMs - yesterdayMs).toBe(24 * 60 * 60 * 1000);
  });

  it('correctly crosses month boundaries (Jan 1 → Dec 31)', () => {
    vi.useFakeTimers();
    // Set clock to Jan 1, 2025 at noon
    vi.setSystemTime(new Date(2025, 0, 1, 12, 0, 0));

    const yesterday = getDateYesterday().split(' ')[0];
    expect(yesterday).toBe('2024-12-31');
  });
});

describe('getDateFormat()', () => {
  it('formats a date as "YYYY-MM-DD"', () => {
    expect(getDateFormat(new Date(2025, 5, 20))).toBe('2025-06-20');
  });

  it('zero-pads the month (Jan → "01")', () => {
    expect(getDateFormat(new Date(2024, 0, 7))).toBe('2024-01-07');
  });

  it('zero-pads the day', () => {
    expect(getDateFormat(new Date(2024, 11, 5))).toBe('2024-12-05');
  });

  it('does NOT include a time component', () => {
    const result = getDateFormat(new Date(2025, 5, 20));
    expect(result).not.toContain(':');
    expect(result.split('-')).toHaveLength(3);
  });

  it('handles year boundaries correctly (Dec 31)', () => {
    expect(getDateFormat(new Date(2023, 11, 31))).toBe('2023-12-31');
  });
});
