import type { Dispatch, RefObject, SetStateAction } from "react";

export const handlePrevious = (
  page: number,
  setToken: Dispatch<SetStateAction<string | undefined>>,
  tokenTracker: RefObject<Map<number, string>>,
  setPage: Dispatch<SetStateAction<number>>,
) => {
  if (page > 1) {
    setToken(tokenTracker.current.get(page - 2) || undefined);
    setPage((prev) => prev - 1);
  }
};

export const handleNext = (
  nextCursor: string | undefined,
  data: unknown[],
  tokenTracker: RefObject<Map<number, string>>,
  page: number,
  setToken: Dispatch<SetStateAction<string | undefined>>,
  setPage: Dispatch<SetStateAction<number>>,
) => {
  if (nextCursor && data?.length == 12) {
    if (tokenTracker.current.size === page - 1)
      tokenTracker.current.set(page, nextCursor);
    setToken(nextCursor);
    setPage((prev) => prev + 1);
  }
};
