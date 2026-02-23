/** Tests for src/components/StatusOverlay.tsx */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import StatusOverlay from '../../../src/components/StatusOverlay';

afterEach(() => {
  vi.useRealTimers();
});

describe('StatusOverlay', () => {
  it('renders the provided text', () => {
    render(<StatusOverlay text="Processing" />);
    expect(screen.getByText(/Processing/)).toBeInTheDocument();
  });

  it('uses purple background by default (no error)', () => {
    const { container } = render(<StatusOverlay text="Loading" />);
    expect(container.querySelector('.bg-purple-700')).not.toBeNull();
    expect(container.querySelector('.bg-red-600')).toBeNull();
  });

  it('uses red background when isError is true', () => {
    const { container } = render(<StatusOverlay text="Error" isError={true} />);
    expect(container.querySelector('.bg-red-600')).not.toBeNull();
    expect(container.querySelector('.bg-purple-700')).toBeNull();
  });

  it('renders the animated loading span when isLoading is true', () => {
    render(<StatusOverlay text="Please wait" isLoading={true} />);
    // The animated dots are rendered inside a span.animate-pulse
    expect(document.querySelector('.animate-pulse')).not.toBeNull();
  });

  it('does NOT render the animated span when isLoading is false', () => {
    render(<StatusOverlay text="Done" isLoading={false} />);
    expect(document.querySelector('.animate-pulse')).toBeNull();
  });

  it('updates the dot indicator every 2 seconds while loading', () => {
    vi.useFakeTimers();
    render(<StatusOverlay text="Wait" isLoading={true} />);

    const span = document.querySelector('.animate-pulse') as HTMLElement;
    expect(span.textContent).toBe(''); // starts empty

    act(() => { vi.advanceTimersByTime(2000); });
    expect(span.textContent).toBe('.');

    act(() => { vi.advanceTimersByTime(2000); });
    expect(span.textContent).toBe('..');
  });
});
