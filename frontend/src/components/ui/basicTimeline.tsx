import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import type { AllRide } from '../../../constants/AllRide';

export interface dataArgs {
  label: string;
  value: string;
}

export function getRideTimeline(ride: AllRide): dataArgs[] {
  // Formats a timestamp into: "DD Mon YY, HH:MM Uhr"
  function formatDateTime(dateStr: string) {
    const date = new Date(dateStr);

    // Extract date components
    const day = date.getDate();
    const month = date.toLocaleString("de-DE", { month: "short" }); // e.g. "Dez"
    const year = date.getFullYear().toString().slice(2); // last two digits

    // Format time to 24h (HH:MM)
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes} Uhr`;
  }

  // Shortens the address by keeping only the important parts
  function formatAddress(address: string) {
    // Convert "x, y, z, ..." → ["x","y","z",...]
    const parts = address.split(",").map(p => p.trim());

    // Return only 2–3 relevant segments, e.g. street + district
    return parts.slice(1, 3).join(", ");
  }

  // Creates two timeline entries: Start and End
  const rideInfo: dataArgs[] = [
    {
      label: "Start-Info",
      value: `${formatDateTime(ride.start_time)} | ${formatAddress(ride.start_address)}`
    },
    {
      label: "End-Info",
      value: `${formatDateTime(ride.end_time)} | ${formatAddress(ride.end_address)}`
    }
  ];


  return rideInfo;
}

export default function BasicTimeline(labelClass: string, valueClass: string,
  ride: AllRide
) {

  const timelineData: dataArgs[] = getRideTimeline(ride);
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {timelineData.map((element, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={index === 0 ? "success" : "error"} />
            {index === 0 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <div className='flex flex-col'>
              <span className={labelClass}>{element.label}</span>
              <span className={valueClass}>{element.value}</span>
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}