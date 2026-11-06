import { Filter, Search } from "lucide-react";

import { Input } from "@/shared/components/ui/input";

export function SearchFilter() {
  return (
    <div className="flex items-center gap-2.5 rounded-4xl bg-background px-3">
      <Search color="#8f8f8f" size={25} strokeWidth={3} />{" "}
      <Input placeholder="Search by recipes"></Input>
      <Filter color="#8f8f8f" size={25} strokeWidth={2} />
    </div>
  );
}
