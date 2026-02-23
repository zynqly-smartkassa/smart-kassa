/** Tests for src/utils/auth.ts – register() and login(). */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios, { AxiosError } from 'axios';

vi.mock('axios', async () => {
  const real = await vi.importActual<typeof import('axios')>('axios');
  return {
    default: { post: vi.fn(), get: vi.fn() },
    AxiosError: (real as { AxiosError: typeof AxiosError }).AxiosError,
  };
});

import { register, login } from '../../../src/utils/auth';

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

const mockDispatch = vi.fn();

beforeEach(() => {
  vi.mocked(axios.post).mockReset();
  mockDispatch.mockReset();
  localStorage.clear();
});

// ============================================================
// register()
// ============================================================

describe('register()', () => {
  const ARGS = ['Max', 'Muster', 'max@test.com', '+43111', 'pw', 'FN123', 'ATU456'] as const;

  it('returns server data and stores the access token on success', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: { accessToken: 'tok', id: '1' },
    });

    const result = await register(...ARGS, mockDispatch);
    expect(result).toMatchObject({ accessToken: 'tok', id: '1' });
    expect(localStorage.getItem('accessToken')).toBe('tok');
  });

  it('calls dispatch with the user data on success', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: { accessToken: 'tok', id: '1' },
    });

    await register(...ARGS, mockDispatch);
    expect(mockDispatch).toHaveBeenCalledOnce();
  });

  it('throws "Internal Server Error" on a 500 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(500));

    await expect(register(...ARGS, mockDispatch)).rejects.toThrow('Internal Server Error');
  });

  it('throws "Email already exists" on 409 with email conflict', async () => {
    vi.mocked(axios.post).mockRejectedValue(
      makeAxiosError(409, { error: 'User with this email already exists' })
    );

    await expect(register(...ARGS, mockDispatch)).rejects.toThrow('Email already exists');
  });

  it('throws "FN already exists" on 409 with FN conflict', async () => {
    vi.mocked(axios.post).mockRejectedValue(
      makeAxiosError(409, { error: `Ein Account mit der FN 'FN123' existiert bereits.` })
    );

    await expect(register(...ARGS, mockDispatch)).rejects.toThrow('FN already exists');
  });

  it('throws "Phonenumber already exists" on 409 with phone conflict', async () => {
    vi.mocked(axios.post).mockRejectedValue(
      makeAxiosError(409, {
        error: `Ein Account mit der Telefonnumer '+43111' existiert bereits.`,
      })
    );

    await expect(register(...ARGS, mockDispatch)).rejects.toThrow('Phonenumber already exists');
  });

  it('throws "ATU already exists" on 409 with ATU conflict', async () => {
    vi.mocked(axios.post).mockRejectedValue(
      makeAxiosError(409, { error: `Ein Account mit der ATU-Nummer 'ATU456' existiert bereits.` })
    );

    await expect(register(...ARGS, mockDispatch)).rejects.toThrow('ATU already exists');
  });

  it('throws "Missing Fields" on a 400 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(400));

    await expect(register(...ARGS, mockDispatch)).rejects.toThrow('Missing Fields');
  });

  it('throws "Internal Server Error" for non-Axios errors', async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error('network down'));

    await expect(register(...ARGS, mockDispatch)).rejects.toThrow('Internal Server Error');
  });
});

// ============================================================
// login()
// ============================================================

describe('login()', () => {
  it('throws synchronously when email is missing', () => {
    expect(() => login('', 'pw', mockDispatch)).toThrow('Missing Fields');
  });

  it('throws synchronously when password is missing', () => {
    expect(() => login('a@b.com', '', mockDispatch)).toThrow('Missing Fields');
  });

  it('returns server data and stores the token on success', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        accessToken: 'login-tok',
        user: { userId: 5, name: 'Max Muster', email: 'max@test.com' },
      },
    });

    const result = await login('max@test.com', 'pw', mockDispatch);
    expect(result.accessToken).toBe('login-tok');
    expect(localStorage.getItem('accessToken')).toBe('login-tok');
  });

  it('calls dispatch with user data on success', async () => {
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        accessToken: 'tok',
        user: { userId: 5, name: 'Max Muster', email: 'max@test.com' },
      },
    });

    await login('max@test.com', 'pw', mockDispatch);
    expect(mockDispatch).toHaveBeenCalledOnce();
  });

  it('throws "Wrong Email or Password" on a 401 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(401));

    await expect(login('a@b.com', 'wrong', mockDispatch)).rejects.toThrow(
      'Wrong Email or Password'
    );
  });

  it('throws "Wrong Email or Password" on a 400 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(400));

    await expect(login('a@b.com', 'wrong', mockDispatch)).rejects.toThrow(
      'Wrong Email or Password'
    );
  });

  it('throws "Internal Server Error" on a 500 response', async () => {
    vi.mocked(axios.post).mockRejectedValue(makeAxiosError(500));

    await expect(login('a@b.com', 'pw', mockDispatch)).rejects.toThrow('Internal Server Error');
  });

  it('throws "Internal Server Error" for non-Axios errors', async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error('network down'));

    await expect(login('a@b.com', 'pw', mockDispatch)).rejects.toThrow('Internal Server Error');
  });
});
