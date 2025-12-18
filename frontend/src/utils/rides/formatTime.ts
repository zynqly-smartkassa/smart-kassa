/**
 * Formats a duration in seconds to HH:MM:SS string format.
 * 
 * This function takes a total number of seconds and converts it to a padded
 * time string suitable for display (e.g., "01:23:45").
 * 
 * @param {number} totalSeconds - Total number of seconds to format.
 * @returns {string} Formatted time string in HH:MM:SS format with zero-padding.
 */
export const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`; // returns 00:00:00 format
};