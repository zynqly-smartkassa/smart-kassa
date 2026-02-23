/** Tests for src/utils/jwttokens.ts – verifyAccessToken(). */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios, { AxiosError } from 'axios';

vi.mock('axios', async () => {
  const real = await vi.importActual<typeof import('axios')>('axios');
  return {
    default: { post: vi.fn(), get: vi.fn() },
    AxiosError: (real as { AxiosError: typeof AxiosError }).AxiosError,
  };
});

import { verifyAccessToken } from '../../../src/utils/jwttokens';

function makeAxiosError(status: number): AxiosError {
  const err = new AxiosError('error', String(status));
  err.response = {
    status,
    data: {},
    headers: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: {} as any,
    statusText: '',
  };
  return err;
}

beforeEach(() => {
  vi.mocked(axios.get).mockReset();
  vi.mocked(axios.post).mockReset();
  localStorage.clear();
});

describe('verifyAccessToken()', () => {
  it('returns user data when the stored token is valid', async () => {
    localStorage.setItem('accessToken', 'valid-token');
    vi.mocked(axios.get).mockResolvedValue({ data: { userId: 1 } });

    const result = await verifyAccessToken();
    expect(result).toEqual({ userId: 1 });
  });

  it('throws "Unknown Error" when no access token is stored', async () => {
    // localStorage is empty – the internal Error is not an AxiosError,
    // so the catch block falls into the else branch.
    await expect(verifyAccessToken()).rejects.toThrow('Unknown Error');
  });

  it('refreshes the token and retries when the first request fails with 401', async () => {
    localStorage.setItem('accessToken', 'expired-token');

    // First GET → 401, second GET → success after refresh
    vi.mocked(axios.get)
      .mockRejectedValueOnce(makeAxiosError(401))
      .mockResolvedValueOnce({ data: { userId: 99 } });

    // Refresh endpoint returns a new token
    vi.mocked(axios.post).mockResolvedValue({ data: { accessToken: 'fresh-token' } });

    const result = await verifyAccessToken();
    expect(result).toEqual({ userId: 99 });
  });

  it('stores the new token in localStorage after a successful refresh', async () => {
    localStorage.setItem('accessToken', 'old-token');

    vi.mocked(axios.get)
      .mockRejectedValueOnce(makeAxiosError(401))
      .mockResolvedValueOnce({ data: {} });

    vi.mocked(axios.post).mockResolvedValue({ data: { accessToken: 'new-token' } });

    await verifyAccessToken();
    expect(localStorage.getItem('accessToken')).toBe('new-token');
  });

  it('throws "Session expired" when the refresh request also fails', async () => {
    localStorage.setItem('accessToken', 'expired-token');

    vi.mocked(axios.get).mockRejectedValue(makeAxiosError(401));
    vi.mocked(axios.post).mockRejectedValue(new Error('network error'));

    await expect(verifyAccessToken()).rejects.toThrow('Session expired, please login again');
  });

  it('clears stored tokens when the refresh fails', async () => {
    localStorage.setItem('accessToken', 'expired-token');
    localStorage.setItem('refreshToken', 'old-refresh');

    vi.mocked(axios.get).mockRejectedValue(makeAxiosError(401));
    vi.mocked(axios.post).mockRejectedValue(new Error('network error'));

    await expect(verifyAccessToken()).rejects.toThrow();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('throws "Unknown Error" for non-Axios errors from the GET request', async () => {
    localStorage.setItem('accessToken', 'token');
    vi.mocked(axios.get).mockRejectedValue(new TypeError('unexpected'));

    await expect(verifyAccessToken()).rejects.toThrow('Unknown Error');
  });
});
