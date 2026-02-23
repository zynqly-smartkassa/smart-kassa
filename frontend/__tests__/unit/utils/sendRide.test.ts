/** Tests for src/utils/rides/ride.ts – sendRide() error handling. */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios, { AxiosError } from 'axios';

// Keep the real AxiosError so instanceof checks in the source code work.
vi.mock('axios', async () => {
  const real = await vi.importActual<typeof import('axios')>('axios');
  return {
    default: { post: vi.fn(), get: vi.fn() },
    AxiosError: (real as { AxiosError: typeof AxiosError }).AxiosError,
  };
});

import { sendRide } from '../../../src/utils/rides/ride';

// Minimal ride payload used across tests
const RIDE = {
  user_id: 1,
  start_address: 'Vienna',
  start_time: '2025-01-01 09:00:00',
  start_lat: 48.2,
  start_lng: 16.37,
  end_address: 'Graz',
  end_time: '2025-01-01 11:00:00',
  end_lat: 47.07,
  end_lng: 15.44,
  duration: '02:00:00',
  distance: 200,
  ride_type: 'business',
  wholeRide: [[48.2, 16.37]] as [number, number][],
};

/** Creates a minimal AxiosError with the given status and optional body. */
function makeAxiosError(status: number, data?: unknown): AxiosError {
  const err = new AxiosError('error', String(status));
  err.response = {
    status,
    data: data ?? {},
    headers: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: {} as any,
    statusText: '',
  };
  return err;
}

beforeEach(() => {
  vi.mocked(axios.post).mockReset();
});

describe('sendRide()', () => {
  it('returns data on a successful response', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: { id: 42 } });

    const result = await sendRide(RIDE);
    expect(result).toEqual({ id: 42 });
  });

  it('throws "Internal Server Error" on a 500 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(500));

    await expect(sendRide(RIDE)).rejects.toThrow('Internal Server Error');
  });

  it('throws "Missing or invalid ride fields" on a 400 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(400));

    await expect(sendRide(RIDE)).rejects.toThrow('Missing or invalid ride fields');
  });

  it('throws the server error message on a 409 response with a body', async () => {
    vi.mocked(axios.post).mockRejectedValue(
      makeAxiosError(409, { error: 'Ride already registered' })
    );

    await expect(sendRide(RIDE)).rejects.toThrow('Ride already registered');
  });

  it('throws a generic "Ride already exists" on a 409 without a body', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(409));

    await expect(sendRide(RIDE)).rejects.toThrow('Ride already exists');
  });

  it('throws "Unknown Error while sending ride" for non-Axios errors', async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error('network failure'));

    await expect(sendRide(RIDE)).rejects.toThrow('Unknown Error while sending ride');
  });
});
