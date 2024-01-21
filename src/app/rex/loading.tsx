import { SkeletonPost } from "@/components/skeleton-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index}>
          <SkeletonPost />
        </div>
      ))}
    </>
  );
}
