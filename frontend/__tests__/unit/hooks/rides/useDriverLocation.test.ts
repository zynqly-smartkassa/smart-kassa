import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

vi.mock("@capacitor/geolocation", () => ({
  Geolocation: {
    checkPermissions: vi.fn(),
    requestPermissions: vi.fn(),
    getCurrentPosition: vi.fn(),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  },
}));

import { toast } from "sonner";
import { Geolocation } from "@capacitor/geolocation";
import { useDriverLocation } from "../../../../src/hooks/rides/useDriverLocation";

describe("useDriverLocation()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows permission toast and does not fetch position if user denies permission", async () => {
    vi.mocked(Geolocation.checkPermissions).mockResolvedValue({ location: "prompt" } as never);
    vi.mocked(Geolocation.requestPermissions).mockResolvedValue({ location: "denied" } as never);

    renderHook(() => useDriverLocation(false));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(Geolocation.getCurrentPosition).not.toHaveBeenCalled();
    expect(Geolocation.watchPosition).not.toHaveBeenCalled();
  });

  it("sets initial location, applies watch updates and clears watch on unmount", async () => {
    let watchCallback:
      | ((
          position: { coords: { latitude: number; longitude: number } } | null,
          err?: unknown
        ) => void)
      | undefined;

    vi.mocked(Geolocation.checkPermissions).mockResolvedValue({ location: "granted" } as never);
    vi.mocked(Geolocation.getCurrentPosition).mockResolvedValue(
      { coords: { latitude: 48.2, longitude: 16.37 } } as never
    );
    vi.mocked(Geolocation.watchPosition).mockImplementation(async (_opts, cb) => {
      watchCallback = cb as typeof watchCallback;
      return "watch-123" as never;
    });

    const { result, unmount } = renderHook(() => useDriverLocation(false));

    await waitFor(() => {
      expect(result.current).toEqual([48.2, 16.37]);
    });

    act(() => {
      watchCallback?.({ coords: { latitude: 48.21, longitude: 16.38 } }, undefined);
    });

    expect(result.current).toEqual([48.21, 16.38]);

    unmount();

    expect(Geolocation.clearWatch).toHaveBeenCalledWith({ id: "watch-123" });
  });

  it("shows GPS error toast when geolocation throws", async () => {
    vi.mocked(Geolocation.checkPermissions).mockRejectedValue(new Error("boom"));

    renderHook(() => useDriverLocation(false));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        "GPS-Fehler aufgetreten",
        expect.objectContaining({ position: "top-center" })
      );
    });
  });
});
