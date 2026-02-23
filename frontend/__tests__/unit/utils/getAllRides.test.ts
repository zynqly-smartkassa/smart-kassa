/** Tests for src/utils/rides/all-rides.ts – getAllRides() error handling. */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios, { AxiosError } from 'axios';

vi.mock('axios', async () => {
  const real = await vi.importActual<typeof import('axios')>('axios');
  return {
    default: { post: vi.fn(), get: vi.fn() },
    AxiosError: (real as { AxiosError: typeof AxiosError }).AxiosError,
  };
});

import { getAllRides } from '../../../src/utils/rides/all-rides';

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

describe('getAllRides()', () => {
  it('returns the ride list on success', async () => {
    const rides = [{ id: 1 }, { id: 2 }];
    vi.mocked(axios.post).mockResolvedValue({ data: rides });

    const result = await getAllRides(42);
    expect(result).toEqual(rides);
  });

  it('passes the user_id in the request body', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: [] });

    await getAllRides(7);

    expect(vi.mocked(axios.post)).toHaveBeenCalledWith(
      expect.any(String),
      { user_id: 7 },
      expect.any(Object)
    );
  });

  it('throws "Internal Server Error" on a 500 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(500));

    await expect(getAllRides(1)).rejects.toThrow('Internal Server Error');
  });

  // HTTP 200 but body is null – the empty-check throws, then the catch re-throws as unknown error
  it('throws when the response body is null', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: null });
    await expect(getAllRides(1)).rejects.toThrow('Unknown Error while sending ride');
  });

  // bad request payload
  it('throws "Missing or invalid ride fields" on a 400 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(400));

    await expect(getAllRides(1)).rejects.toThrow('Missing or invalid ride fields');
  });

  it('throws the server error message on a 409 with a body', async () => {
    vi.mocked(axios.post).mockRejectedValue(
      makeAxiosError(409, { error: 'Conflict detail' })
    );

    await expect(getAllRides(1)).rejects.toThrow('Conflict detail');
  });

  it('throws a generic message on a 409 without a body', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(409));

    await expect(getAllRides(1)).rejects.toThrow('Ride already exists');
  });

  it('throws "Unknown Error while sending ride" for non-Axios errors', async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error('timeout'));

    await expect(getAllRides(1)).rejects.toThrow('Unknown Error while sending ride');
  });
});
