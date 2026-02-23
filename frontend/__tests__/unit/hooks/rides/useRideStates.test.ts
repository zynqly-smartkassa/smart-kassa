import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

import { toast } from "sonner";
import { useRideStates } from "../../../../src/hooks/rides/useRideStates";

describe("useRideStates()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("updates destination validity based on input", () => {
    const { result } = renderHook(() => useRideStates(false, null));

    expect(result.current.destination).toBe("");
    expect(result.current.isDestinationInvalid).toBe(true);

    act(() => {
      result.current.setDestination("Hauptstrasse 1");
    });

    expect(result.current.isDestinationInvalid).toBe(false);

    act(() => {
      result.current.setDestination("Hacker<script>");
    });

    expect(result.current.isDestinationInvalid).toBe(true);
  });

  it("sets routing start coords from latest driver location via showNewRoute", () => {
    const { result, rerender } = renderHook(
      ({ isRideActive, driverLocation }) =>
        useRideStates(isRideActive, driverLocation),
      {
        initialProps: {
          isRideActive: false,
          driverLocation: null as [number, number] | null,
        },
      }
    );

    rerender({ isRideActive: false, driverLocation: [48.2, 16.37] });

    act(() => {
      result.current.showNewRoute();
    });

    expect(result.current.routingStartCoords).toEqual([48.2, 16.37]);
  });

  it("increments timer every second while ride is active", () => {
    const { result } = renderHook(() => useRideStates(true, null));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.timer).toBe(3);
  });

  it("refreshes route start every 10 seconds while active", () => {
    const { result } = renderHook(() => useRideStates(true, [48.3, 16.4]));

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.routingStartCoords).toEqual([48.3, 16.4]);
  });

  it("checkRide returns false and shows toast for rides <= 5 seconds", () => {
    const { result } = renderHook(() => useRideStates(true, null));

    act(() => {
      result.current.setTimer(5);
    });

    expect(result.current.checkRide()).toBe(false);
    expect(toast).toHaveBeenCalledTimes(1);
  });

  it("checkRide returns true for active rides longer than 5 seconds", () => {
    const { result } = renderHook(() => useRideStates(true, null));

    act(() => {
      result.current.setTimer(6);
    });

    expect(result.current.checkRide()).toBe(true);
    expect(toast).not.toHaveBeenCalled();
  });
});
