import LoadingRideCard from "./LoadingRideCard";

const LoadingRides = () => (
  <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 2xl:grid-cols-4 3xl:grid-cols-5">
    {Array.from({ length: 8 }).map((_, i) => (
      <li key={i} className="w-full">
        <LoadingRideCard />
      </li>
    ))}
  </ul>
);

export default LoadingRides;
