/** Tests for src/hooks/useValidator.ts – all pure validation functions. */

import { describe, it, expect } from 'vitest';
import {
  useInvalidUsername,
  useInvalidEmail,
  useInvalidPassword,
  useInvalidConfirmPassword,
  useInvalidATU,
  useInvalidFirmenbuchnummer,
  useInvalidTelefonnummer,
  isValidAddressInput,
} from '../../../src/hooks/useValidator';

// ============================================================
// useInvalidUsername()
// ============================================================

describe('useInvalidUsername()', () => {
  it('returns true for an empty string', () => {
    expect(useInvalidUsername('')).toBe(true);
  });

  it('returns false for a non-empty string', () => {
    expect(useInvalidUsername('Max')).toBe(false);
  });
});

// ============================================================
// useInvalidEmail()
// ============================================================

describe('useInvalidEmail()', () => {
  it.each([
    ['', 'empty string'],
    ['notanemail', 'no @ symbol'],
    ['missing@', 'no domain'],
    ['@nodomain.com', 'no local part'],
    ['spaces @domain.com', 'contains space'],
    ['user@domain', 'no TLD'],
  ])('returns true for "%s" (%s)', (email) => {
    expect(useInvalidEmail(email)).toBe(true);
  });

  it.each([
    ['user@example.com'],
    ['user.name+tag@sub.domain.org'],
    ['USER@TEST.COM'],
    ['a@b.io'],
  ])('returns false for valid e-mail "%s"', (email) => {
    expect(useInvalidEmail(email)).toBe(false);
  });
});

// ============================================================
// useInvalidPassword()
// ============================================================

describe('useInvalidPassword()', () => {
  it('marks empty string as invalid with all sub-checks false', () => {
    const result = useInvalidPassword('');
    expect(result.passwordIsInvalid).toBe(true);
    expect(result.passwordhasSpecialChar).toBe(false);
    expect(result.passwordhasNumber).toBe(false);
    expect(result.passwordminimum6Chars).toBe(false);
  });

  it('marks a password missing a number as invalid', () => {
    const result = useInvalidPassword('NoNumber!');
    expect(result.passwordhasNumber).toBe(false);
    expect(result.passwordIsInvalid).toBe(true);
  });

  it('marks a password missing a special character as invalid', () => {
    const result = useInvalidPassword('NoSpecial1');
    expect(result.passwordhasSpecialChar).toBe(false);
    expect(result.passwordIsInvalid).toBe(true);
  });

  it('marks a password shorter than 8 characters as invalid', () => {
    const result = useInvalidPassword('Ab1!');
    expect(result.passwordminimum6Chars).toBe(false);
    expect(result.passwordIsInvalid).toBe(true);
  });

  it('marks a strong password as valid and sets all sub-checks to true', () => {
    const result = useInvalidPassword('Secure1!');
    expect(result.passwordIsInvalid).toBe(false);
    expect(result.passwordhasSpecialChar).toBe(true);
    expect(result.passwordhasNumber).toBe(true);
    expect(result.passwordminimum6Chars).toBe(true);
  });
});

// ============================================================
// useInvalidConfirmPassword()
// ============================================================

describe('useInvalidConfirmPassword()', () => {
  it('is invalid when confirmPassword is empty', () => {
    const result = useInvalidConfirmPassword('Pw1!abcd', '');
    expect(result.invalid).toBe(true);
    expect(result.missing).toBe(true);
    expect(result.matching).toBe(false);
  });

  it('is invalid when passwords do not match', () => {
    const result = useInvalidConfirmPassword('Pw1!abcd', 'different');
    expect(result.invalid).toBe(true);
    expect(result.missing).toBe(false);
    expect(result.matching).toBe(false);
  });

  it('is valid when passwords match', () => {
    const result = useInvalidConfirmPassword('Pw1!abcd', 'Pw1!abcd');
    expect(result.invalid).toBe(false);
    expect(result.missing).toBe(false);
    expect(result.matching).toBe(true);
  });
});

// ============================================================
// useInvalidATU()
// ============================================================

describe('useInvalidATU()', () => {
  it.each([
    ['', 'empty'],
    ['ATU123', 'too short'],
    ['ATU12345678X', 'letter instead of digit'],
    ['atu123456789', 'lowercase prefix'],
    ['EU123456789', 'wrong prefix'],
  ])('returns true for "%s" (%s)', (atu) => {
    expect(useInvalidATU(atu)).toBe(true);
  });

  it('returns false for a valid ATU number', () => {
    expect(useInvalidATU('ATU123456789')).toBe(false);
  });

  it('strips whitespace before validating', () => {
    expect(useInvalidATU('  ATU123456789  ')).toBe(false);
  });
});

// ============================================================
// useInvalidFirmenbuchnummer()
// ============================================================

describe('useInvalidFirmenbuchnummer()', () => {
  it.each([
    ['', 'empty'],
    ['FN12345', 'no trailing letter'],
    ['fn123456a', 'lowercase prefix'],
    ['FN1234567', 'too many digits'],
    ['FN12345A', 'uppercase trailing letter'],
  ])('returns true for "%s" (%s)', (fn) => {
    expect(useInvalidFirmenbuchnummer(fn)).toBe(true);
  });

  it('returns false for a valid FN (6 digits + lowercase letter)', () => {
    expect(useInvalidFirmenbuchnummer('FN123456a')).toBe(false);
  });
});

// ============================================================
// useInvalidTelefonnummer()
// ============================================================

describe('useInvalidTelefonnummer()', () => {
  it('returns true for an empty string', () => {
    expect(useInvalidTelefonnummer('')).toBe(true);
  });

  it('returns true for a number shorter than 7 characters', () => {
    expect(useInvalidTelefonnummer('123')).toBe(true);
  });

  it('returns true for a number containing letters', () => {
    expect(useInvalidTelefonnummer('123abc456')).toBe(true);
  });

  it.each([
    ['+43 664 1234567'],
    ['0664 1234567'],
    ['+1 (555) 123-4567'],
    ['06641234567'],
  ])('returns false for valid phone number "%s"', (phone) => {
    expect(useInvalidTelefonnummer(phone)).toBe(false);
  });
});

// ============================================================
// isValidAddressInput()
// ============================================================

describe('isValidAddressInput()', () => {
  it('returns true for an empty string (no disallowed chars)', () => {
    expect(isValidAddressInput('')).toBe(true);
  });

  it.each([
    ['Hauptstrasse 1'],
    ['Main St, 12345 City'],
    ['Muster-Gasse 3'],
    ['4020 Linz'],
  ])('returns true for valid address "%s"', (addr) => {
    expect(isValidAddressInput(addr)).toBe(true);
  });

  it.each([
    ['Hacker<script>'],
    ['Street & Avenue'],
    ['Test@email.com'],
  ])('returns false for address containing invalid characters "%s"', (addr) => {
    expect(isValidAddressInput(addr)).toBe(false);
  });
});
