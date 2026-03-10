import { QRCodeSVG } from 'qrcode.react';
import { Info } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

/**
 * Interface representing a single line item in the bill.
 * 
 * @property {string} label - Description of the charge.
 * @property {string} value - Monetary value as a formatted string.
 * @property {boolean} [isSubTotal] - Optional flag to indicate if this is a subtotal line.
 * @property {boolean} [isTotal] - Optional flag to indicate if this is the total line.
 */
interface BillDetail {
  label: string;
  value: string;
  isSubTotal?: boolean;
  isTotal?: boolean;
}

const billDetails: BillDetail[] = [
  {
    label: "Base Fare",
    value: "10.00€"
  },
  {
    label: "Ride Charges for 150 min",
    value: "300.00€"
  },
  {
    label: "Pause Charges for 25 min",
    value: "25.00€"
  },
  {
    label: "Sub Total",
    value: "335.00€",
    isSubTotal: true
  },
  {
    label: "GST(5%)",
    value: "16.75€"
  },
];

/**
 * Component that displays a detailed bill summary for a completed ride.
 * 
 * This component shows:
 * - A QR code for viewing the detailed bill on another device
 * - Itemized bill details including base fare, ride charges, pause charges, and taxes
 * - Subtotal and total amount calculations
 * - Navigation back to the previous page
 * 
 * @returns {JSX.Element} The bill summary interface with QR code and itemized charges.
 */
const Bill = () => {
  const navigator = useNavigate();
  return (
    <div className='w-full flex flex-col gap-8 items-center'>
      <Button variant={"ghost"}  onClick={() => navigator(-1)} 
      className='self-start p-0'>
        <ArrowLeft className='w-10 h-10'></ArrowLeft>
        <span className='font-bold text-2xl'>Bill Summary</span>
      </Button>


      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='font-extrabold text-violet-400 text-2xl'>Scan to View Detailed Bill</h1>
      <QRCodeSVG className='w-60 h-60 mx-auto' value="https://reactjs.org/"
      level="H" fgColor="#6D28D9"></QRCodeSVG>
      </div>

     
      <div className='w-full border-b-black border-b-2'></div>

      <div className='w-full flex flex-col items-start gap-3'>
        <div className='w-full flex flex-col gap-4'>
          <div className='flex flex-row items-center gap-2'> 
          <h2 className='font-bold text-lg'>Bill Details</h2>
           <Info></Info>
          </div>
          
        <ul className='w-full flex flex-col gap-3'>
          {billDetails.map((info, index) => (
            <li key={index} className='flex justify-between'>
              <span className={`${info.isSubTotal ? "font-bold text-lg" : ""}`}>{info.label}</span>
              <span className={`${info.isSubTotal ? "font-bold text-lg" : ""}`}>{info.value}</span>
            </li>
          ))}
        </ul>
        </div>
       
      </div>

      <div className='w-full border-b-black border-b-2'></div>

        <div className='w-full flex flex-row justify-between items-start text-lg'>
          <h3 className='font-bold'>Total Money</h3>
          <span className='font-bold text-violet-400'>352.00€</span>
        </div>  
    </div>
  )
}

export default Bill
