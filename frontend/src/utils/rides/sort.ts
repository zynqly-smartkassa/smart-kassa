import type { AllRide } from "constants/AllRide";

function getMilliSeconds(rideDate: string) {


  const cleanDateString = rideDate.replace('T', ' ').split(" ").join(" | ").slice(0, 21)
  const [dateString, timeString] = cleanDateString.split(" | ");


  const [year, month, day] = dateString.split("-").map(Number);
  const [h, m, s] = timeString.split(":").map(Number)

  return new Date(year, month - 1, day, h, m, s).getTime();

}

export function date(rides: AllRide[], isDescending: boolean) {

  if (isDescending) {
  return  rides.sort((a, b) => 
    getMilliSeconds(b.start_time) - getMilliSeconds(a.start_time));
  }

  return rides.sort((a, b) => 
    getMilliSeconds(a.start_time) - getMilliSeconds(b.start_time));
}


export function distance(rides: AllRide[], isDescending: boolean) {

  if (isDescending) {
   return rides.sort((a, b) => b.distance - a.distance);
  }

  return rides.sort((a, b) => a.distance - b.distance)
}


export function duration(rides: AllRide[], isDescending: boolean) {

  if (isDescending) {
  return  rides.sort((a, b) => 
    timeToSeconds(b.duration) - timeToSeconds(a.duration));
  }

  return rides.sort((a, b) => 
    timeToSeconds(a.duration) - timeToSeconds(b.duration));
}


export function timeToSeconds(timeString: string) {
  const [h, m, s] = timeString.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}
