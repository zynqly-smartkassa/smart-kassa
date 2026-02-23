/** Tests for src/components/SearchInput.tsx */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '../../../src/components/SearchInput';

afterEach(() => {
  vi.useRealTimers();
});

describe('SearchInput', () => {
  it('renders a text input', () => {
    render(<SearchInput />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('shows no loading indicator initially', () => {
    render(<SearchInput />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // fireEvent is synchronous and safe to use with fake timers.
  it('shows the loading indicator while the user is typing', () => {
    vi.useFakeTimers();
    render(<SearchInput />);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Vi' } });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('hides the loading indicator after the 500 ms debounce', () => {
    vi.useFakeTimers();
    render(<SearchInput />);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Vi' } });
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(600); });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('accepts typed characters and reflects them in the input value', async () => {
    render(<SearchInput />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    await userEvent.type(input, 'Vienna');
    expect(input.value).toBe('Vienna');
  });
});
