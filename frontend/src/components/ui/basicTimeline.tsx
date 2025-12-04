import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';

export default function BasicTimeline(labelClass: string, valueClass: string,
  data: {label: string, value: string}[]
) {
  return (
     <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {data.map((element, index) => (
            <TimelineItem key={index}>
        <TimelineSeparator>
          <TimelineDot color={`${index === 0 ? "success" : "error"}`} />
          <TimelineConnector/>
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