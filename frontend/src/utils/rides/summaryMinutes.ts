/**
 * Converts a duration string in HH:MM:SS format to total minutes.
 * 
 * This function parses a duration string and converts it to total minutes,
 * rounding up seconds to the nearest minute.
 * 
 * @param {string} duration - Duration string in format "HH:MM:SS".
 * @returns {number} Total duration in minutes.
 */
export function durationToMinutes(duration: string): number {
  const [h, m, s] = duration.split(":").map(Number);
  return h * 60 + m + Math.round(s / 60);
}

/**
 * Formats a number of minutes into a human-readable German string.
 * 
 * Converts minutes to hours and minutes format, displaying:
 * - "X Std Y Min" for durations with both hours and minutes
 * - "X Std" for durations with only hours
 * - "Y Min" for durations less than an hour
 * 
 * @param {number} mins - Total number of minutes to format.
 * @returns {string} Formatted duration string in German.
 */
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