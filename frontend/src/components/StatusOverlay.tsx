import React, { useEffect, useState } from "react";
import { X } from 'lucide-react';
import { useNavigate } from "react-router";

/**
 * Args for the StatusOverlay component.
 * 
 * @property {string} text - The main message to display in the overlay.
 * @property {string[]} [errorFallback] - Optional array of error messages to display when loading takes too long or an error occurs.
 * @property {boolean} [isError] - Optional flag to indicate if the overlay should display an error state immediately.
 * @property {boolean} [isLoading] - Optional flag to indicate if the overlay should display a loading state with animated dots.
 */
interface StatusOverlayProps {
  text: string;
  errorFallback?: string[];
  isError?: boolean;
  isLoading?: boolean;
}

/**
 * StatusOverlay component that displays a fullscreen overlay with loading or error states.
 * 
 * The component shows a loading message with animated dots when `isLoading` is true.
 * After 5 seconds of loading, it automatically transitions to an error state and displays
 * the error fallback messages if provided. The overlay can be dismissed by clicking the X button.
 * 
 * @param {StatusOverlayProps} args - The args for the component.
 * @returns {JSX.Element} A fullscreen overlay with status information.
 */
const StatusOverlay: React.FC<StatusOverlayProps> = ({
  text,
  errorFallback,
  isError = false,
  isLoading = false,
}) => {
  const [dots, setDots] = useState("");
  const [stillLoading, setStillLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (!isLoading) return;

    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setDots(".".repeat(count));
    }, 1000);

    const timeout = setTimeout(() => {
      console.log("Ausfuhrung")
      if (isLoading) {
        setStillLoading(true);
      }
    }, 5000)

    return () => {
      clearInterval(interval);
      clearTimeout(timeout)
    }
      ;
  }, [isLoading]);


  return (
    <div className="fixed inset-0 flex  gap-4 items-center justify-center z-40 bg-black/30 backdrop-blur-sm">


      <div
        className={`px-6 py-6 relative rounded-2xl shadow-xl max-w-xs text-center transition-colors
          ${isError || stillLoading ? "bg-red-600 text-white" : "bg-purple-700 text-white"}`}
      >
        {/* Dynamic Error Message */}
        {stillLoading && (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-2xl">Error</span>
            <span className="text-left font-semibold mt-2 mb-1">
              {errorFallback && errorFallback.length == 1 ?
                "Mögliche Ursache:" : "Mögliche Ursachen:"}</span>
            <ul className="text-left list-disc ml-5 space-y-1">
              {errorFallback && errorFallback.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {/* X Button */}
        {stillLoading && (
          <div className="bg-black rounded-full absolute -right-2 -top-3">
            <X className="w-7 h-7" onClick={() => navigator(0)}></X>
          </div>
        )}

        {/* Normal Loading Message */}
        {!stillLoading && (
          <p className="text-lg font-semibold">
            {text}
            {isLoading && <span className="animate-pulse">{dots}</span>}
          </p>
        )}

      </div>
    </div>
  );
};

export default StatusOverlay;
