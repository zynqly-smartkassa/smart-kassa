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

/**
 * Formats a date string into a human-readable relative time string.
 * 
 * Converts a date string in "YYYY-MM-DD HH:MM:SS" format to a relative time
 * description (e.g., "2 hours ago", "about 1 week ago").
 * 
 * @param {string} dateString - Date string in format "YYYY-MM-DD HH:MM:SS".
 * @returns {string} Formatted relative time string in English.
 */
export function formatTimeAgo(dateString: string): string {
  //(yy-mm-dd hh:mm:ss)
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // JS Date: month 0 based
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime(); // difference in ms
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears >= 1) return diffYears === 1 ? "about 1 year ago" : `about ${diffYears} years ago`;
  if (diffMonths >= 1) return diffMonths === 1 ? "about 1 month ago" : `about ${diffMonths} months ago`;
  if (diffWeeks >= 1) return diffWeeks === 1 ? "about 1 week ago" : `about ${diffWeeks} weeks ago`;
  if (diffDays >= 1) return diffDays === 1 ? "about 1 day ago" : `about ${diffDays} days ago`;
  if (diffHours >= 1) return diffHours === 1 ? "about 1 hour ago" : `about ${diffHours} hours ago`;
  if (diffMinutes >= 1) return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
  
  return "just now";
}
