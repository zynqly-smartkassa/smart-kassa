import React, { useEffect, useState } from "react";

interface StatusOverlayProps {
  text: string;
  isError?: boolean;
  isLoading?: boolean;
}

const StatusOverlay: React.FC<StatusOverlayProps> = ({
  text,
  isError = false,
  isLoading = false,
}) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return;

    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setDots(".".repeat(count));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/30 backdrop-blur-sm">
      <div
        className={`px-8 py-6 relative rounded-2xl shadow-xl max-w-xs text-center transition-colors
          ${isError ? "bg-red-600 text-white" : "bg-purple-700 text-white"}`}
      >
        <p className="text-lg font-semibold">
          {text}
          {isLoading && <span className="animate-pulse">{dots}</span>}
        </p>
      </div>
    </div>
  );
};

export default StatusOverlay;
