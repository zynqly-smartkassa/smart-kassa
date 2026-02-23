/**
 * Tests for reverseGeocode.ts and geoAdress.ts.
 * fetch is stubbed via vi.stubGlobal – no real HTTP requests are made.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { reverseGeocode } from '../../../src/utils/rides/reverseGeocode';
import { geocodeAddress } from '../../../src/utils/rides/geoAdress';

afterEach(() => {
  vi.unstubAllGlobals();
});

// helper to replace global fetch with a mock response
function stubFetch(body: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: vi.fn().mockResolvedValue(body),
    })
  );
}

describe('reverseGeocode()', () => {
  it('returns the display_name on success', async () => {
    stubFetch({ display_name: 'Vienna, Austria' });

    const result = await reverseGeocode(48.2082, 16.3738);
    expect(result).toBe('Vienna, Austria');
  });

  it('calls the Nominatim endpoint with the correct lat/lon', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ display_name: 'Test Place' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await reverseGeocode(48.2082, 16.3738);

    const calledUrl: string = fetchMock.mock.calls[0][0];
    expect(calledUrl).toContain('lat=48.2082');
    expect(calledUrl).toContain('lon=16.3738');
    expect(calledUrl).toContain('nominatim');
  });

  it('returns null when display_name is missing', async () => {
    stubFetch({ address: {} }); // no display_name field

    const result = await reverseGeocode(0, 0);
    expect(result).toBeNull();
  });

  it('returns null when the API response is empty/null', async () => {
    stubFetch(null);

    const result = await reverseGeocode(0, 0);
    expect(result).toBeNull();
  });

  it('returns null when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const result = await reverseGeocode(0, 0);
    expect(result).toBeNull();
  });
});

describe('geocodeAddress()', () => {
  it('returns [lat, lon] as numbers on success', async () => {
    stubFetch([{ lat: '48.2082', lon: '16.3738', display_name: 'Vienna' }]);

    const result = await geocodeAddress('Vienna');
    expect(result).toEqual([48.2082, 16.3738]);
  });

  it('encodes the address in the request URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([{ lat: '1', lon: '2' }]),
    });
    vi.stubGlobal('fetch', fetchMock);

    await geocodeAddress('Main Street 10');

    const calledUrl: string = fetchMock.mock.calls[0][0];
    // The address must be URL-encoded
    expect(calledUrl).toContain(encodeURIComponent('Main Street 10'));
  });

  it('returns null when the API returns an empty array', async () => {
    stubFetch([]);

    const result = await geocodeAddress('Unknown Place');
    expect(result).toBeNull();
  });

  it('returns null when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const result = await geocodeAddress('Vienna');
    expect(result).toBeNull();
  });

  it('parses lat/lon strings to floating-point numbers', async () => {
    stubFetch([{ lat: '48.123456', lon: '16.987654' }]);

    const result = await geocodeAddress('Test');
    expect(typeof result![0]).toBe('number');
    expect(typeof result![1]).toBe('number');
  });
});
