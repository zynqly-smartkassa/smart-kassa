// import { getAllRides } from "@/utils/rides/all-rides";
// import { useEffect, useState } from "react";
// import type { AllRide } from "../../../constants/AllRide";

// export const useGetAllRides = (cursor: string | undefined) => {
//   const [loading, setIsLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [rides, setRides] = useState<AllRide[] | null>(null);
//   const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getAllRides(cursor);
//         setRides(data.rides);
//         setNextCursor(data.next_cursor);
//       } catch {
//         setError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [cursor]);

//   return { loading, error, rides, nextCursor };
// };
