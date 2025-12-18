import { Trophy } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Message = () => {
  return (
    <Card className="border-x-0 border-t-0 rounded-none
     flex flex-row gap-4 items-center py-0 px-6 py-10">
      <div className='bg-orange-400/50 p-2 rounded-full'>
              <Trophy></Trophy>
        </div>

      <div className='flex flex-col gap-6'>
        <CardHeader className='p-0'>
          <CardTitle>New Badge unlocked!</CardTitle>
        </CardHeader>
        <div className='flex flex-col gap-1'>
          <CardContent className='text-sm p-0'>
            <p>You earned the "Driver of the month" badge</p>
          </CardContent>
          <CardFooter className='p-0 text-xs text-gray-400'>
            <p>about 1 hour ego</p>
          </CardFooter>
        </div>

      </div>
    </Card>
  )
}

export default Message
