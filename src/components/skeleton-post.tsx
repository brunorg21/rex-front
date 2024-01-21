import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function SkeletonPost() {
  return (
    <Card className="shadow-md border-muted">
      <CardHeader className="space-y-3">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-12 rounded-full w-[60px]" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-[500px]" />

              <Skeleton className="h-2 w-[200px]" />
            </div>
          </div>
        </div>

        <Skeleton className="h-6 w-[300px]" />
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Skeleton className="h-25 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>

        <Skeleton className="h-40 w-full" />

        <div className="flex gap-2">
          <div className="flex content-center items-center gap-2">
            <Skeleton className="h-6 w-[60px]" />
          </div>

          <div className="flex content-center items-center gap-2">
            <Skeleton className="h-6 w-[60px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
