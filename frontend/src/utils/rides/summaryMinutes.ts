export function durationToMinutes(duration: string): number {
  const [h, m, s] = duration.split(":").map(Number);
  return h * 60 + m + Math.round(s / 60);
}

export function formatMinutes(mins: number): string {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} Std ${minutes} Min`;
  }
  if (hours > 0) {
    return `${hours} Std`;
  }
  return `${minutes} Min`;
}