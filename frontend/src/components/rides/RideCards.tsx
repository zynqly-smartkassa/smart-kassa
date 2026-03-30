import RideAtDate, { type RideAtDateArgs } from "./RideAtDate";
import { TabsContent } from "../ui/tabs";
import LoadingRides from "./LoadingRides";

const RideCards = ({
  isDescending,
  isLoading,
  rideType,
  rides,
  sortAfter,
}: RideAtDateArgs & { isLoading: boolean }) => {
  const values = ["today", "yesterday", "all"];

  if (isLoading) {
    return <LoadingRides />;
  }
  return (
    <div className="w-full">
      {values.map((val, index) => (
        <TabsContent key={index} value={val}>
          <RideAtDate
            rides={rides}
            sortAfter={sortAfter}
            isDescending={isDescending}
            rideType={rideType}
          ></RideAtDate>
        </TabsContent>
      ))}
    </div>
  );
};

export default RideCards;
