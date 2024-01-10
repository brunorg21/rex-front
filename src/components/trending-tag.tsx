import { Button } from "./ui/button";

interface TrendingTagProps {
  tag: string;
  postsRelated: number;
}

export function TrendingTag({ tag, postsRelated }: TrendingTagProps) {
  return (
    <Button
      className="w-full p-7 flex flex-col text-lg  items-start"
      variant="ghost"
    >
      #{tag}
      <span className="text-sm text-muted-foreground">
        {postsRelated} posts
      </span>
    </Button>
  );
}
