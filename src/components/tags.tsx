import { ToggleGroupItem } from "./ui/toggle-group";

interface TagProps {
  value: string;
}

export function Tag({ value }: TagProps) {
  return (
    <ToggleGroupItem className="h-5 p-3" variant={"outline"} value={value}>
      #{value}
    </ToggleGroupItem>
  );
}
