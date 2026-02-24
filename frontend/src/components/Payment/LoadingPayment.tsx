import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const LoadingPayment = () => {
  return (
    <section className="flex flex-col w-full min-h-screen">
      {/* Page title */}
      <div className="flex flex-col gap-1 pb-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 mt-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Ride Summary Card Skeleton */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-48 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Route */}
            <div className="space-y-3 relative">
              <div className="flex items-start gap-3">
                <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>
              </div>

              {/* Dashed line placeholder */}
              <div className="ml-[0.875rem] border-l-4 border-dashed border-primary/10 h-10" />

              <div className="flex items-start gap-3">
                <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment & Summary Card Skeleton */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-44 mt-1" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment method buttons */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 mb-3" />
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>

            {/* Fahrpreis input */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Trinkgeld input */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Summary */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between pt-3 border-t">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-11 w-full rounded-md" />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default LoadingPayment;
