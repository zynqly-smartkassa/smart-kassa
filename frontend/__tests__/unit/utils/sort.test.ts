/** Tests for sort.ts – timeToSeconds(), date(), distance(), duration(). */

import { describe, it, expect } from 'vitest';
import type { AllRide } from '../../../constants/AllRide';
import { timeToSeconds, date, distance, duration } from '../../../src/utils/rides/sort';

// shared ride fixture
function makeRide(overrides: Partial<AllRide>): AllRide {
  return {
    user_id: 1,
    start_address: 'A',
    start_time: '2025-01-01 10:00:00',
    end_address: 'B',
    end_time: '2025-01-01 11:00:00',
    duration: '01:00:00',
    distance: 10,
    ride_type: 'business',
    ...overrides,
  };
}

const RIDE_JAN5 = makeRide({ start_time: '2025-01-05 09:00:00' });
const RIDE_JAN2 = makeRide({ start_time: '2025-01-02 08:00:00' });
const RIDE_JAN9 = makeRide({ start_time: '2025-01-09 14:30:00' });

describe('timeToSeconds()', () => {
  // covers zero, each unit in isolation (s, min, h), and a combined value
  it.each([
    ['00:00:00', 0],
    ['00:00:01', 1],
    ['00:01:00', 60],
    ['01:00:00', 3600],
    ['02:30:45', 9045],  // 2*3600 + 30*60 + 45
    ['10:00:00', 36000],
  ] as const)('converts "%s" → %i s', (input, expected) => {
    expect(timeToSeconds(input)).toBe(expected);
  });
});

describe('date()', () => {
  // false = ascending (oldest → newest), true = descending (newest → oldest)
  it('sorts ascending (oldest first)', () => {
    const rides = [RIDE_JAN9, RIDE_JAN2, RIDE_JAN5];
    const sorted = date([...rides], false);
    expect(sorted[0].start_time).toBe(RIDE_JAN2.start_time);
    expect(sorted[1].start_time).toBe(RIDE_JAN5.start_time);
    expect(sorted[2].start_time).toBe(RIDE_JAN9.start_time);
  });

  it('sorts descending (newest first)', () => {
    const rides = [RIDE_JAN2, RIDE_JAN5, RIDE_JAN9];
    const sorted = date([...rides], true);
    expect(sorted[0].start_time).toBe(RIDE_JAN9.start_time);
    expect(sorted[1].start_time).toBe(RIDE_JAN5.start_time);
    expect(sorted[2].start_time).toBe(RIDE_JAN2.start_time);
  });

  it('handles an empty array gracefully', () => {
    expect(date([], false)).toEqual([]);
  });

  it('handles a single-element array', () => {
    const result = date([RIDE_JAN5], true);
    expect(result).toHaveLength(1);
  });

  // Verifies that ISO 8601 "T" separator is also handled
  it('parses start_time strings that use "T" as separator', () => {
    const r1 = makeRide({ start_time: '2025-03-01T10:00:00' });
    const r2 = makeRide({ start_time: '2025-03-02T10:00:00' });
    const sorted = date([r2, r1], false);
    expect(sorted[0].start_time).toBe(r1.start_time);
  });
});

describe('distance()', () => {
  // false = asc (shortest first), true = desc (longest first)
  const r5  = makeRide({ distance: 5 });
  const r20 = makeRide({ distance: 20 });
  const r10 = makeRide({ distance: 10 });

  it('sorts ascending (shortest first)', () => {
    const sorted = distance([r20, r5, r10], false);
    expect(sorted.map((r) => r.distance)).toEqual([5, 10, 20]);
  });

  it('sorts descending (longest first)', () => {
    const sorted = distance([r5, r10, r20], true);
    expect(sorted.map((r) => r.distance)).toEqual([20, 10, 5]);
  });

  it('handles an empty array', () => {
    expect(distance([], true)).toEqual([]);
  });

  it('keeps equal distances stable-ish (does not throw)', () => {
    const a = makeRide({ distance: 7 });
    const b = makeRide({ distance: 7 });
    expect(() => distance([a, b], false)).not.toThrow();
  });
});

describe('duration()', () => {
  // false = asc (shortest first), true = desc (longest first)
  const d30  = makeRide({ duration: '00:30:00' });
  const d90  = makeRide({ duration: '01:30:00' });
  const d150 = makeRide({ duration: '02:30:00' });

  it('sorts ascending (shortest first)', () => {
    const sorted = duration([d150, d30, d90], false);
    expect(sorted.map((r) => r.duration)).toEqual(['00:30:00', '01:30:00', '02:30:00']);
  });

  it('sorts descending (longest first)', () => {
    const sorted = duration([d30, d150, d90], true);
    expect(sorted.map((r) => r.duration)).toEqual(['02:30:00', '01:30:00', '00:30:00']);
  });

  it('handles an empty array', () => {
    expect(duration([], false)).toEqual([]);
  });
});
