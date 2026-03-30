const Bar = ({ className }: { className?: string }) => (
  <div className={`bg-gray-400 dark:bg-muted animate-pulse rounded ${className}`} />
);

export default Bar;
