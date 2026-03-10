import type { AllRide } from "../../../constants/AllRide";

/**
 * Pads a number with a leading zero if less than 10.
 * 
 * @param {number} n - The number to pad.
 * @returns {string} Zero-padded string representation of the number.
 */
 function pad(n: number) {
    return n < 10 ? "0" + n : n.toString();
  }

/**
 * Filters rides to return only those that started today.
 * 
 * This function compares the start_time of each ride with today's date,
 * matching year, month, and day components.
 * 
 * @param {AllRide[]} rides - The array of all rides to filter.
 * @returns {AllRide[]} Array containing only today's rides.
 */
 export function getRidesToday(rides: AllRide[])  {
    const ridesToday =  rides.filter((element) => {
    const onlyDate = element.start_time.replace('T', ' ').split(" ")[0];
    const today = new Date();
    const [year, month, day] = onlyDate.split("-");

    if (pad(today.getFullYear()) === year &&
      pad(today.getMonth() + 1) === month &&
      pad(today.getDate()) === (day)) {
      return element;
    }
  })

  return ridesToday;
 }

/**
 * Filters rides to return only those that started yesterday.
 * 
 * This function compares the start_time of each ride with yesterday's date,
 * matching year, month, and day components.
 * 
 * @param {AllRide[]} rides - The array of all rides to filter.
 * @returns {AllRide[]} Array containing only yesterday's rides.
 */
 export function getRidesYesterday(rides: AllRide[])  {
   const ridesYesterday =  rides.filter((element) => {
    const onlyDate = element.start_time.replace('T', ' ').split(" ")[0];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1)
    const [year, month, day] = onlyDate.split("-");

    if (pad(yesterday.getFullYear()) === year &&
      pad(yesterday.getMonth() + 1) === month && //because month is 0 based, Nov is: 10
      pad(yesterday.getDate()) === day) {
      return element;
    }
  })

  return ridesYesterday;
 }
 