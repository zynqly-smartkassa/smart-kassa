
/**
 * Gets the current date and time as a formatted string.
 * 
 * Returns the current timestamp in the format "YYYY-MM-DD HH:MM:SS" with
 * zero-padding for all components.
 * 
 * @returns {string} Current date and time as "YYYY-MM-DD HH:MM:SS".
 */
export function getDateNow() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0 based
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formatted
}

/**
 * Gets yesterday's date and time as a formatted string.
 * 
 * Returns yesterday's timestamp (24 hours ago) in the format "YYYY-MM-DD HH:MM:SS"
 * with zero-padding for all components.
 * 
 * @returns {string} Yesterday's date and time as "YYYY-MM-DD HH:MM:SS".
 */
export function getDateYesterday() {
  const now = new Date();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1)

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Months are 0 based
  const day = String(yesterday.getDate()).padStart(2, "0");

  const hours = String(yesterday.getHours()).padStart(2, "0");
  const minutes = String(yesterday.getMinutes()).padStart(2, "0");
  const seconds = String(yesterday.getSeconds()).padStart(2, "0");

  const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formatted
}

/**
 * Formats a Date object to a date-only string.
 * 
 * Converts a Date object to "YYYY-MM-DD" format with zero-padding,
 * excluding time components.
 * 
 * @param {Date} date - The Date object to format.
 * @returns {string} Formatted date string as "YYYY-MM-DD".
 */
export function getDateFormat(date: Date) {

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0 based
  const day = String(date.getDate()).padStart(2, "0");

  const formatted = `${year}-${month}-${day}`;

  return formatted
}

