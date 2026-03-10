export const formatDate = (dateString: string | undefined): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleString("de-DE", {
    // de-DE for 17.12.2025 Format
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
