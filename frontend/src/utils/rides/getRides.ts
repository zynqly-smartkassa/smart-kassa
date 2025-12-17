import type { AllRide } from "constants/AllRide";

 function pad(n: number) {
    return n < 10 ? "0" + n : n.toString();
  }

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
 