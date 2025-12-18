import type { AllRide } from "constants/AllRide";

/**
 * Converts a ride date string to milliseconds timestamp.
 * 
 * This helper function parses date strings in the format used by the application
 * and converts them to milliseconds for comparison purposes.
 * 
 * @param {string} rideDate - The date string to convert.
 * @returns {number} The timestamp in milliseconds.
 */
function getMilliSeconds(rideDate: string) {


  const cleanDateString = rideDate.replace('T', ' ').split(" ").join(" | ").slice(0, 21)
  const [dateString, timeString] = cleanDateString.split(" | ");


  const [year, month, day] = dateString.split("-").map(Number);
  const [h, m, s] = timeString.split(":").map(Number)

  return new Date(year, month - 1, day, h, m, s).getTime();

}

/**
 * Sorts an array of rides by date (start_time).
 * 
 * This function modifies the original array in place, sorting rides by their start time
 * in either ascending or descending order.
 * 
 * @param {AllRide[]} rides - The array of rides to sort (modified in place).
 * @param {boolean} isDescending - If true, sorts newest to oldest; if false, sorts oldest to newest.
 * @returns {AllRide[]} The sorted array reference.
 */
export function date(rides: AllRide[], isDescending: boolean) {

  if (isDescending) {
  return  rides.sort((a, b) => 
    getMilliSeconds(b.start_time) - getMilliSeconds(a.start_time));
  }

  return rides.sort((a, b) => 
    getMilliSeconds(a.start_time) - getMilliSeconds(b.start_time));
}

/**
 * Sorts an array of rides by distance traveled.
 * 
 * This function modifies the original array in place, sorting rides by their total
 * distance in either ascending or descending order.
 * 
 * @param {AllRide[]} rides - The array of rides to sort (modified in place).
 * @param {boolean} isDescending - If true, sorts longest to shortest; if false, sorts shortest to longest.
 * @returns {AllRide[]} The sorted array reference.
 */
export function distance(rides: AllRide[], isDescending: boolean) {

  if (isDescending) {
   return rides.sort((a, b) => b.distance - a.distance);
  }

  return rides.sort((a, b) => a.distance - b.distance)
}

/**
 * Sorts an array of rides by duration.
 * 
 * This function modifies the original array in place, sorting rides by their total
 * duration in either ascending or descending order.
 * 
 * @param {AllRide[]} rides - The array of rides to sort (modified in place).
 * @param {boolean} isDescending - If true, sorts longest to shortest; if false, sorts shortest to longest.
 * @returns {AllRide[]} The sorted array reference.
 */
export function duration(rides: AllRide[], isDescending: boolean) {

  if (isDescending) {
  return  rides.sort((a, b) => 
    timeToSeconds(b.duration) - timeToSeconds(a.duration));
  }

  return rides.sort((a, b) => 
    timeToSeconds(a.duration) - timeToSeconds(b.duration));
}

/**
 * Converts a time string in HH:MM:SS format to total seconds.
 * 
 * @param {string} timeString - Time string in format "HH:MM:SS".
 * @returns {number} Total number of seconds.
 */
export function timeToSeconds(timeString: string) {
  const [h, m, s] = timeString.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}
