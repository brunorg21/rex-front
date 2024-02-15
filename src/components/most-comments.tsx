"use client";

import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Flame } from "lucide-react";
import { TrendingTag } from "./trending-tag";

import { SearchUsers } from "./search-users";

export function MostComment() {
  return (
    <div className="flex flex-col gap-4">
      <SearchUsers />

      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center ">
            Em alta <Flame className="h-8 w-8" />
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <TrendingTag tag="Viagem" postsRelated={200} />
          <TrendingTag tag="Paisagem" postsRelated={200} />
          <TrendingTag tag="Natureza" postsRelated={200} />
          <TrendingTag tag="Brasil" postsRelated={200} />
          <TrendingTag tag="Política" postsRelated={200} />
          <TrendingTag tag="PT" postsRelated={200} />
        </CardContent>
      </Card>
    </div>
  );
}
