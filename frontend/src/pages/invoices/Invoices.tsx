import { type ListBlobResultBlob } from "@vercel/blob";
import { AuthStorage } from "@/utils/secureStorage";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBills } from "../../../redux/slices/invoices";
import type { AppDispatch, RootState } from "redux/store";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../components/ui/empty";
import {
  ArrowUpRightIcon,
  FolderOpen,
  FileText,
  Download,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { isMobile } from "../../hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const Invoices = () => {
  const dispatch: AppDispatch = useDispatch();
  const bills = useSelector((state: RootState) => state.setBills.bills);
  const [loading, setLoading] = useState(true);
  const [blobs, setBlobs] = useState<ListBlobResultBlob[]>([]);
  const navigator = useNavigate();

  const fetchBills = useCallback(async () => {
    if (!bills || bills.length === 0) {
      const accessToken = await AuthStorage.getAccessToken();
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/list-blobs/invoices`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(setBills(data.actualFiles));
      setBlobs(data.actualFiles);
      setLoading(false);
    } else {
      setBlobs(bills);
      setLoading(false);
    }

    console.log(bills);
  }, [dispatch, bills]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      // en-GB für 17/12/2025 Format
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="text-3xl font-extrabold">Invoices</h2>
        <p className="text-base text-gray-600 dark:text-gray-500">
          View and download all your generated invoices
        </p>
      </div>

      <div className="flex flex-col min-h-[70vh] mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {blobs.length !== 0 &&
            !loading &&
            blobs.map((blob) => (
              <Card
                key={blob.pathname}
                className="rounded-xl border border-border/40 bg-gray-300/60 dark:bg-black/30 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950">
                      <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Invoice
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blob.uploadedAt.toString())}</span>
                  </div>

                  <CardDescription className="mt-3 text-xs">
                    {blob.pathname.split("/").pop()}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 pt-4">
                  <Button asChild className="w-full" variant="link">
                    <a
                      href={blob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Online
                    </a>
                  </Button>
                  <Button asChild className="w-full" variant="outline">
                    <a href={blob.downloadUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        {blobs.length === 0 && !loading && (
          <Empty className="justify-self-center md:scale-150">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderOpen />
              </EmptyMedia>
              <EmptyTitle>No Invoices Yet</EmptyTitle>
              <EmptyDescription>
                You don&apos;t have any invoices yet.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (isMobile) {
                      navigator("/ride");
                    } else {
                      navigator("/statistics");
                    }
                  }}
                >
                  {isMobile ? "Start a Ride" : "Check Statistics"}
                </Button>
                <Button variant="outline" onClick={() => navigator("/")}>
                  Back to Home
                </Button>
              </div>
            </EmptyContent>
            <Button
              variant="link"
              asChild
              className="text-muted-foreground"
              size="sm"
            >
              <a href="#">
                Learn More <ArrowUpRightIcon />
              </a>
            </Button>
          </Empty>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.of(1, 2, 3, 4, 5, 6).map((_, index) => (
              <Card
                key={index}
                title="Loading Card"
                className="rounded-xl border border-border/40 bg-gray-300/60 dark:bg-black/30 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950">
                      <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Invoice
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="bg-gray-600 animate-pulse text-transparent rounded w-32 h-5" />
                  </div>

                  <CardDescription className="mt-3 text-xs">
                    <span className="bg-gray-600 animate-pulse text-transparent rounded w-32 h-5" />
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 pt-4">
                  <Button asChild className="w-full">
                    <span className="bg-gray-600 animate-pulse"></span>
                  </Button>
                  <Button disabled asChild className="w-full">
                    <span className="bg-gray-600 animate-pulse"></span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Invoices;
