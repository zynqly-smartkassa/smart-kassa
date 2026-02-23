/** Tests for summaryMinutes.ts – durationToMinutes() and formatMinutes(). */

import { describe, it, expect } from 'vitest';
import {
  durationToMinutes,
  formatMinutes,
} from '../../../src/utils/rides/summaryMinutes';

describe('durationToMinutes()', () => {
  it('returns 0 for "00:00:00"', () => {
    expect(durationToMinutes('00:00:00')).toBe(0);
  });

  it('converts exactly 1 hour to 60 minutes', () => {
    expect(durationToMinutes('01:00:00')).toBe(60);
  });

  it('converts 30 minutes correctly', () => {
    expect(durationToMinutes('00:30:00')).toBe(30);
  });

  it('rounds 29 seconds up to +0 minutes (< 30 s threshold rounds to 0)', () => {
    // Math.round(29/60) = 0
    expect(durationToMinutes('00:00:29')).toBe(0);
  });

  it('rounds 30 seconds up to 1 minute', () => {
    // Math.round(30/60) = 1
    expect(durationToMinutes('00:00:30')).toBe(1);
  });

  it('converts "02:15:00" to 135 minutes', () => {
    expect(durationToMinutes('02:15:00')).toBe(135);
  });

  it('converts "10:00:00" to 600 minutes', () => {
    expect(durationToMinutes('10:00:00')).toBe(600);
  });

  it('converts a full day "24:00:00" to 1440 minutes', () => {
    expect(durationToMinutes('24:00:00')).toBe(1440);
  });
});

describe('formatMinutes()', () => {
  // minutes-only
  it('returns "0 Min" for 0 minutes', () => {
    expect(formatMinutes(0)).toBe('0 Min');
  });

  it('returns "1 Min" for 1 minute', () => {
    expect(formatMinutes(1)).toBe('1 Min');
  });

  it('returns "45 Min" for 45 minutes', () => {
    expect(formatMinutes(45)).toBe('45 Min');
  });

  it('returns "59 Min" for 59 minutes', () => {
    expect(formatMinutes(59)).toBe('59 Min');
  });

  // hours-only
  it('returns "1 Std" for exactly 60 minutes', () => {
    expect(formatMinutes(60)).toBe('1 Std');
  });

  it('returns "2 Std" for exactly 120 minutes', () => {
    expect(formatMinutes(120)).toBe('2 Std');
  });

  it('returns "10 Std" for exactly 600 minutes', () => {
    expect(formatMinutes(600)).toBe('10 Std');
  });

  // hours + minutes combined
  it('returns "1 Std 30 Min" for 90 minutes', () => {
    expect(formatMinutes(90)).toBe('1 Std 30 Min');
  });

  it('returns "2 Std 15 Min" for 135 minutes', () => {
    expect(formatMinutes(135)).toBe('2 Std 15 Min');
  });

  it('returns "3 Std 1 Min" for 181 minutes', () => {
    expect(formatMinutes(181)).toBe('3 Std 1 Min');
  });
});
