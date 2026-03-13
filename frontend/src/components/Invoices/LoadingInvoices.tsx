import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { FileText, Calendar } from "lucide-react";
import { Button } from "../ui/button";

const LoadingInvoices = () => {
  return (
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
                <CardTitle className="card-title-standard">Rechnung</CardTitle>
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
  );
};

export default LoadingInvoices;
