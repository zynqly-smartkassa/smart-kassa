import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const QrCodeScanner = ({
  downloadUrl,
  url,
}: {
  downloadUrl: string | null;
  url: string | null;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <QrCode className="absolute top-12 right-4" />
      </DialogTrigger>
      <DialogContent className="p-6 flex flex-col items-center gap-4">
        {url ? (
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="section-header">
                Scannen um zu Downloaden
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Scannen Sie den QR-Code mit Ihrem Smartphone
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 bg-white rounded-lg">
              <QRCodeSVG size={260} value={downloadUrl ?? url} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-amber-50 dark:bg-amber-950">
              <QrCode className="w-12 h-12 text-amber-600 dark:text-amber-400" />
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-lg font-semibold">
                QR-Code nicht verfügbar
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Für diese Rechnung konnte kein QR-Code erstellt werden, da keine
                URL verfügbar ist.
              </DialogDescription>
            </DialogHeader>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeScanner;
