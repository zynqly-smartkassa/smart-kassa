/** Tests for getRides.ts – getRidesToday() and getRidesYesterday(). */

import { describe, it, expect, vi, afterEach } from 'vitest';
import type { AllRide } from '../../../constants/AllRide';
import { getRidesToday, getRidesYesterday } from '../../../src/utils/rides/getRides';

// minimal AllRide fixture
function makeRide(start_time: string): AllRide {
  return {
    user_id: 1,
    start_address: 'Vienna',
    start_time,
    end_address: 'Graz',
    end_time: start_time,
    duration: '01:00:00',
    distance: 100,
    ride_type: 'business',
  };
}

// Pin the clock to a fixed date so the tests are deterministic
const TODAY = new Date(2025, 5, 15); // 2025-06-15

afterEach(() => vi.useRealTimers());

describe('getRidesToday()', () => {
  // basic filter: only rides from today pass through
  it('returns only rides that took place today (space-separated format)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);

    const todayRide   = makeRide('2025-06-15 09:00:00');
    const tomorrowRide = makeRide('2025-06-16 09:00:00');
    const pastRide    = makeRide('2025-01-10 09:00:00');

    const result = getRidesToday([todayRide, tomorrowRide, pastRide]);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(todayRide);
  });

  // start_time with a 'T' separator must also be recognized
  it('also matches rides with ISO "T" separator', () => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);

    const todayIso = makeRide('2025-06-15T14:22:00');
    expect(getRidesToday([todayIso])).toHaveLength(1);
  });

  it('returns an empty array when no rides match today', () => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);

    expect(getRidesToday([makeRide('2024-06-15 10:00:00')])).toHaveLength(0);
  });

  it('returns an empty array for an empty input', () => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);

    expect(getRidesToday([])).toHaveLength(0);
  });

  it('returns multiple rides when several happened today', () => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);

    const r1 = makeRide('2025-06-15 07:00:00');
    const r2 = makeRide('2025-06-15 18:00:00');
    const r3 = makeRide('2025-06-14 08:00:00'); // yesterday – must be excluded

    const result = getRidesToday([r1, r2, r3]);
    expect(result).toHaveLength(2);
  });
});

describe('getRidesYesterday()', () => {
  // basic filter: only yesterday's rides pass through
  it('returns only rides from yesterday', () => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);

    const yRide     = makeRide('2025-06-14 12:00:00');
    const todayRide = makeRide('2025-06-15 12:00:00');
    const oldRide   = makeRide('2025-01-01 12:00:00');

    const result = getRidesYesterday([yRide, todayRide, oldRide]);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(yRide);
  });

  // June 1 → yesterday is May 31 (month rollback)
  it('crosses month boundary correctly (June 1 → May 31)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 5, 1)); // June 1

    const ride = makeRide('2025-05-31 10:00:00');
    expect(getRidesYesterday([ride])).toHaveLength(1);
  });

  it('crosses year boundary correctly (Jan 1 → Dec 31)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 0, 1)); // Jan 1

    const ride = makeRide('2024-12-31 23:59:59');
    expect(getRidesYesterday([ride])).toHaveLength(1);
  });

  it('returns an empty array for an empty input', () => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);

    expect(getRidesYesterday([])).toHaveLength(0);
  });
});
