import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

import { toast } from "sonner";
import { useWarningToast } from "../../../src/hooks/useToast";

describe("useWarningToast()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows toast once and dispatches reset action when showToast is true", () => {
    const dispatch = vi.fn();

    const { rerender } = renderHook(
      ({ showToast, message }) => useWarningToast(showToast, message, dispatch),
      {
        initialProps: { showToast: true, message: "Bitte einloggen" },
      }
    );

    expect(toast).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "Toast/ToastWarningShowed" })
    );

    rerender({ showToast: true, message: "Bitte einloggen" });

    expect(toast).toHaveBeenCalledTimes(1);
  });

  it("does not show toast when showToast is false", () => {
    const dispatch = vi.fn();

    renderHook(() => useWarningToast(false, "Bitte einloggen", dispatch));

    expect(toast).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });
});
