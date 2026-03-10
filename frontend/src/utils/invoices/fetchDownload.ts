import { toast } from "sonner";

export const fetchDownload = async (
  fileUrl: string | null,
  fileName: string
) => {
  try {
    if (!fileUrl) {
      toast.error("file url could not load", { className: "mt-5 md:mt-0" });
      return;
    }

    const response = await fetch(fileUrl);

    if (!response.ok) {
      toast.error(
        "Ein Fehler beim herunterladen von der Rechnung ist aufgetreten."
      );
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    toast.error(
      "Ein unerwarteter Fehler beim herunterladen von der Rechnung ist aufgetreten."
    );
  }
};
